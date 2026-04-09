import { Test, TestingModule } from '@nestjs/testing';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { CreateQueueDto, UpdateQueueDto, QueueStatus } from './queue.dto';

describe('QueueController', () => {
  let controller: QueueController;
  let service: QueueService;

  const mockQueueResult = {
    queue: [
      {
        id: '1',
        clientName: 'Juan Pérez',
        phoneNumber: '+573001234567',
        position: 1,
        status: 'in-progress',
        estimatedTime: 15,
        priority: false,
        createdAt: new Date(),
        queueDate: new Date(),
      },
    ],
    total: 1,
    currentPosition: 1,
    message: 'OK',
  };

  const mockService = {
    getQueue: jest.fn().mockResolvedValue(mockQueueResult),
    getQueueMock: jest.fn().mockResolvedValue({ success: true, data: [], message: 'Mock' }),
    addToQueue: jest.fn().mockResolvedValue({ success: true, data: {}, totalInQueue: 1 }),
    updateQueueItem: jest.fn().mockResolvedValue({ success: true, message: 'Updated' }),
    removeFromQueue: jest.fn().mockResolvedValue({ success: true, message: 'Removed' }),
    nextInQueue: jest.fn().mockResolvedValue({ success: true, message: 'Next' }),
    completeQueueItem: jest.fn().mockResolvedValue({ success: true, message: 'Completed' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueController],
      providers: [{ provide: QueueService, useValue: mockService }],
    }).compile();

    controller = module.get<QueueController>(QueueController);
    service = module.get<QueueService>(QueueService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getQueue', () => {
    it('should call service.getQueue and return its result', async () => {
      const result = await controller.getQueue();

      expect(service.getQueue).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockQueueResult);
    });
  });

  describe('getQueueMock', () => {
    it('should call service.getQueueMock and return its result', async () => {
      const result = await controller.getQueueMock();

      expect(service.getQueueMock).toHaveBeenCalledTimes(1);
      expect(result.success).toBe(true);
    });
  });

  describe('addToQueue', () => {
    it('should call service.addToQueue with the provided DTO', async () => {
      const dto: CreateQueueDto = {
        clientName: 'Test',
        phoneNumber: '+573001111111',
      };

      await controller.addToQueue(dto);

      expect(service.addToQueue).toHaveBeenCalledWith(dto);
    });

    it('should return service result', async () => {
      const dto: CreateQueueDto = {
        clientName: 'Test',
        phoneNumber: '+573001111111',
      };

      const result = await controller.addToQueue(dto);

      expect(result.success).toBe(true);
    });
  });

  describe('updateQueueItem', () => {
    it('should call service.updateQueueItem with id and DTO', async () => {
      const dto: UpdateQueueDto = { status: QueueStatus.COMPLETED };

      await controller.updateQueueItem('1', dto);

      expect(service.updateQueueItem).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('removeFromQueue', () => {
    it('should call service.removeFromQueue with the given id', async () => {
      await controller.removeFromQueue('42');

      expect(service.removeFromQueue).toHaveBeenCalledWith('42');
    });
  });

  describe('nextInQueue', () => {
    it('should call service.nextInQueue', async () => {
      await controller.nextInQueue();

      expect(service.nextInQueue).toHaveBeenCalledTimes(1);
    });
  });

  describe('completeQueueItem', () => {
    it('should call service.completeQueueItem with the given id', async () => {
      await controller.completeQueueItem('5');

      expect(service.completeQueueItem).toHaveBeenCalledWith('5');
    });
  });
});
