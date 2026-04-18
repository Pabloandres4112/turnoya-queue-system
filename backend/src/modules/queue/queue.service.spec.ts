import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueEntity, QueueStatus as EntityQueueStatus } from './queue.entity';
import { UserEntity } from '../users/user.entity';
import { CreateQueueDto, UpdateQueueDto, QueueStatus } from './queue.dto';

const BUSINESS_ID = 'biz-uuid-1234';

function makeQueryBuilder(overrides: Record<string, jest.Mock> = {}) {
  const builder: Record<string, jest.Mock> = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue({}),
    getMany: jest.fn().mockResolvedValue([]),
    getOne: jest.fn().mockResolvedValue(null),
    getCount: jest.fn().mockResolvedValue(0),
    ...overrides,
  };
  return builder;
}

describe('QueueService', () => {
  let service: QueueService;
  let queueBuilder: ReturnType<typeof makeQueryBuilder>;

  const mockQueueRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockUserRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    queueBuilder = makeQueryBuilder();
    mockQueueRepo.createQueryBuilder.mockReturnValue(queueBuilder);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        { provide: getRepositoryToken(QueueEntity), useValue: mockQueueRepo },
        { provide: getRepositoryToken(UserEntity), useValue: mockUserRepo },
      ],
    }).compile();

    service = module.get<QueueService>(QueueService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getQueue', () => {
    it('should return queue data with correct shape', async () => {
      queueBuilder.getMany.mockResolvedValue([]);
      const result = await service.getQueue(BUSINESS_ID);
      expect(result).toHaveProperty('queue');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('currentPosition');
      expect(Array.isArray(result.queue)).toBe(true);
    });

    it('should return items from the repository', async () => {
      const mockItems = [
        { id: '1', clientName: 'A', status: EntityQueueStatus.IN_PROGRESS, position: 1 },
        { id: '2', clientName: 'B', status: EntityQueueStatus.WAITING, position: 2 },
      ];
      queueBuilder.getMany.mockResolvedValue(mockItems);
      const result = await service.getQueue(BUSINESS_ID);
      expect(result.total).toBe(2);
      expect(result.queue).toHaveLength(2);
    });

    it('should set currentPosition to the IN_PROGRESS item position', async () => {
      const mockItems = [
        { id: '1', status: EntityQueueStatus.IN_PROGRESS, position: 1 },
        { id: '2', status: EntityQueueStatus.WAITING, position: 2 },
      ];
      queueBuilder.getMany.mockResolvedValue(mockItems);
      const result = await service.getQueue(BUSINESS_ID);
      expect(result.currentPosition).toBe(1);
    });

    it('should set currentPosition to 0 when no IN_PROGRESS item', async () => {
      queueBuilder.getMany.mockResolvedValue([]);
      const result = await service.getQueue(BUSINESS_ID);
      expect(result.currentPosition).toBe(0);
    });
  });

  describe('addToQueue', () => {
    beforeEach(() => {
      queueBuilder.getOne.mockResolvedValue(null);
      queueBuilder.getCount.mockResolvedValue(1);
      mockUserRepo.findOne.mockResolvedValue(null);
      mockQueueRepo.create.mockImplementation((data: Partial<QueueEntity>) => data);
      mockQueueRepo.save.mockImplementation((data: Partial<QueueEntity>) =>
        Promise.resolve({ id: 'new-uuid', ...data }),
      );
    });

    it('should add a client and return success', async () => {
      const dto: CreateQueueDto = { clientName: 'Test Client', phoneNumber: '+573001111111' };
      const result = await service.addToQueue(BUSINESS_ID, dto);
      expect(result.success).toBe(true);
      expect(result.data.clientName).toBe('Test Client');
      expect(result.data.phoneNumber).toBe('+573001111111');
    });

    it('should assign position 1 when queue is empty', async () => {
      queueBuilder.getOne.mockResolvedValue(null);
      const result = await service.addToQueue(BUSINESS_ID, { clientName: 'A', phoneNumber: '+1234' });
      expect(result.data.position).toBe(1);
    });

    it('should assign next position after the last active item', async () => {
      queueBuilder.getOne.mockResolvedValue({ position: 3 });
      queueBuilder.getCount.mockResolvedValue(4);
      const result = await service.addToQueue(BUSINESS_ID, { clientName: 'A', phoneNumber: '+1234' });
      expect(result.data.position).toBe(4);
      expect(result.totalInQueue).toBe(4);
    });

    it('should use provided estimatedTimeMinutes', async () => {
      const dto: CreateQueueDto = { clientName: 'A', phoneNumber: '+1234', estimatedTimeMinutes: 45 };
      const result = await service.addToQueue(BUSINESS_ID, dto);
      expect(result.data.estimatedTimeMinutes).toBe(45);
    });

    it('should derive estimatedTimeMinutes from business averageServiceTime', async () => {
      mockUserRepo.findOne.mockResolvedValue({ settings: { averageServiceTime: 20 } });
      queueBuilder.getOne.mockResolvedValue({ position: 2 }); // next = 3
      const result = await service.addToQueue(BUSINESS_ID, { clientName: 'A', phoneNumber: '+1234' });
      // position 3 → wait = 20 * (3 - 1) = 40
      expect(result.data.estimatedTimeMinutes).toBe(40);
    });

    it('should use 30 min default when business has no settings and position is 1', async () => {
      mockUserRepo.findOne.mockResolvedValue({ settings: null });
      queueBuilder.getOne.mockResolvedValue(null); // position 1 → wait = 30 * 0 = 0
      const result = await service.addToQueue(BUSINESS_ID, { clientName: 'A', phoneNumber: '+1234' });
      expect(result.data.estimatedTimeMinutes).toBe(0); // 30 * (1 - 1)
    });

    it('should default priority to false when not provided', async () => {
      const result = await service.addToQueue(BUSINESS_ID, { clientName: 'A', phoneNumber: '+1234' });
      expect(result.data.priority).toBe(false);
    });

    it('should set priority to true when provided', async () => {
      const result = await service.addToQueue(BUSINESS_ID, {
        clientName: 'A',
        phoneNumber: '+1234',
        priority: true,
      });
      expect(result.data.priority).toBe(true);
    });

    it('should set status to WAITING for new clients', async () => {
      const result = await service.addToQueue(BUSINESS_ID, { clientName: 'A', phoneNumber: '+1234' });
      expect(result.data.status).toBe(EntityQueueStatus.WAITING);
    });

    it('should return a unique id for the new client', async () => {
      const result = await service.addToQueue(BUSINESS_ID, { clientName: 'A', phoneNumber: '+1234' });
      expect(result.data.id).toBeDefined();
      expect(typeof result.data.id).toBe('string');
    });
  });

  describe('updateQueueItem', () => {
    it('should update status and return success', async () => {
      const item = { id: '1', status: EntityQueueStatus.WAITING, position: 1, estimatedTimeMinutes: 30 };
      mockQueueRepo.findOne.mockResolvedValue(item);
      mockQueueRepo.save.mockResolvedValue({ ...item, status: EntityQueueStatus.COMPLETED });

      const dto: UpdateQueueDto = { status: QueueStatus.COMPLETED };
      const result = await service.updateQueueItem(BUSINESS_ID, '1', dto);

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });

    it('should throw NotFoundException when item not found', async () => {
      mockQueueRepo.findOne.mockResolvedValue(null);
      await expect(
        service.updateQueueItem(BUSINESS_ID, 'nonexistent', {}),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeFromQueue', () => {
    it('should remove item and return success', async () => {
      const item = { id: '1', position: 2, businessId: BUSINESS_ID };
      mockQueueRepo.findOne.mockResolvedValue(item);
      mockQueueRepo.remove.mockResolvedValue(item);
      queueBuilder.execute.mockResolvedValue({});
      queueBuilder.getMany.mockResolvedValue([]);
      mockUserRepo.findOne.mockResolvedValue(null);

      const result = await service.removeFromQueue(BUSINESS_ID, '1');

      expect(result.success).toBe(true);
      expect(mockQueueRepo.remove).toHaveBeenCalledWith(item);
    });

    it('should throw NotFoundException when item not found', async () => {
      mockQueueRepo.findOne.mockResolvedValue(null);
      await expect(
        service.removeFromQueue(BUSINESS_ID, 'nonexistent'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('nextInQueue', () => {
    it('should complete IN_PROGRESS and advance next WAITING', async () => {
      const inProgress = { id: '1', status: EntityQueueStatus.IN_PROGRESS, position: 1 };
      const nextWaiting = { id: '2', status: EntityQueueStatus.WAITING, position: 2 };

      queueBuilder.getOne
        .mockResolvedValueOnce(inProgress)
        .mockResolvedValueOnce(nextWaiting);
      queueBuilder.getMany.mockResolvedValue([]);
      mockUserRepo.findOne.mockResolvedValue(null);
      mockQueueRepo.save.mockImplementation((data: Partial<QueueEntity>) => Promise.resolve(data));

      const result = await service.nextInQueue(BUSINESS_ID);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should return null data when no more WAITING items', async () => {
      queueBuilder.getOne.mockResolvedValue(null);
      const result = await service.nextInQueue(BUSINESS_ID);
      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
    });
  });

  describe('completeQueueItem', () => {
    it('should mark item as COMPLETED and return success', async () => {
      const item = { id: '1', status: EntityQueueStatus.IN_PROGRESS };
      mockQueueRepo.findOne.mockResolvedValue(item);
      mockQueueRepo.save.mockResolvedValue({ ...item, status: EntityQueueStatus.COMPLETED });
      queueBuilder.getMany.mockResolvedValue([]);
      mockUserRepo.findOne.mockResolvedValue(null);

      const result = await service.completeQueueItem(BUSINESS_ID, '1');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Turno completado');
    });

    it('should throw NotFoundException when item not found', async () => {
      mockQueueRepo.findOne.mockResolvedValue(null);
      await expect(
        service.completeQueueItem(BUSINESS_ID, 'nonexistent'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
