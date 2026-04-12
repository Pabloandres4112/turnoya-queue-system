import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { CreateQueueDto, UpdateQueueDto, QueueStatus } from './queue.dto';

describe('QueueService', () => {
  let service: QueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueService],
    }).compile();

    service = module.get<QueueService>(QueueService);
  });

  describe('getQueue', () => {
    it('should return queue data with correct shape', async () => {
      const result = await service.getQueue();

      expect(result).toHaveProperty('queue');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('currentPosition');
      expect(Array.isArray(result.queue)).toBe(true);
    });

    it('should return seeded mock data with 3 initial items', async () => {
      const result = await service.getQueue();

      expect(result.total).toBe(3);
      expect(result.queue).toHaveLength(3);
    });

    it('should include items with required fields', async () => {
      const result = await service.getQueue();
      const item = result.queue[0];

      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('clientName');
      expect(item).toHaveProperty('phoneNumber');
      expect(item).toHaveProperty('position');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('estimatedTimeMinutes');
      expect(item).toHaveProperty('priority');
    });
  });

  describe('getQueueMock', () => {
    it('should return success true', async () => {
      const result = await service.getQueueMock();

      expect(result.success).toBe(true);
    });

    it('should return mock data array', async () => {
      const result = await service.getQueueMock();

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });
  });

  describe('addToQueue', () => {
    it('should add a client and return success', async () => {
      const dto: CreateQueueDto = {
        clientName: 'Test Client',
        phoneNumber: '+573001111111',
      };

      const result = await service.addToQueue(dto);

      expect(result.success).toBe(true);
      expect(result.data.clientName).toBe('Test Client');
      expect(result.data.phoneNumber).toBe('+573001111111');
    });

    it('should assign a new position at the end of the queue', async () => {
      const initialResult = await service.getQueue();
      const initialLength = initialResult.total;

      const dto: CreateQueueDto = {
        clientName: 'New Client',
        phoneNumber: '+573002222222',
      };

      const result = await service.addToQueue(dto);

      expect(result.data.position).toBe(initialLength + 1);
      expect(result.totalInQueue).toBe(initialLength + 1);
    });

    it('should use default estimatedTimeMinutes of 30 when not provided', async () => {
      const dto: CreateQueueDto = {
        clientName: 'Default Time Client',
        phoneNumber: '+573003333333',
      };

      const result = await service.addToQueue(dto);

      expect(result.data.estimatedTimeMinutes).toBe(30);
    });

    it('should use provided estimatedTimeMinutes', async () => {
      const dto: CreateQueueDto = {
        clientName: 'Custom Time Client',
        phoneNumber: '+573004444444',
        estimatedTimeMinutes: 45,
      };

      const result = await service.addToQueue(dto);

      expect(result.data.estimatedTimeMinutes).toBe(45);
    });

    it('should default priority to false when not provided', async () => {
      const dto: CreateQueueDto = {
        clientName: 'No Priority Client',
        phoneNumber: '+573005555555',
      };

      const result = await service.addToQueue(dto);

      expect(result.data.priority).toBe(false);
    });

    it('should set priority to true when provided', async () => {
      const dto: CreateQueueDto = {
        clientName: 'Priority Client',
        phoneNumber: '+573006666666',
        priority: true,
      };

      const result = await service.addToQueue(dto);

      expect(result.data.priority).toBe(true);
    });

    it('should set status to waiting for new clients', async () => {
      const dto: CreateQueueDto = {
        clientName: 'Waiting Client',
        phoneNumber: '+573007777777',
      };

      const result = await service.addToQueue(dto);

      expect(result.data.status).toBe('waiting');
    });

    it('should assign a unique id to the new client', async () => {
      const dto: CreateQueueDto = {
        clientName: 'Unique ID Client',
        phoneNumber: '+573008888888',
      };

      const result = await service.addToQueue(dto);

      expect(result.data.id).toBeDefined();
      expect(typeof result.data.id).toBe('string');
    });

    it('should increase total queue count after adding', async () => {
      const before = await service.getQueue();

      await service.addToQueue({
        clientName: 'Extra Client',
        phoneNumber: '+573009999999',
      });

      const after = await service.getQueue();

      expect(after.total).toBe(before.total + 1);
    });
  });

  describe('updateQueueItem', () => {
    it('should return success when updating a queue item', async () => {
      const dto: UpdateQueueDto = { status: QueueStatus.COMPLETED };
      const result = await service.updateQueueItem('1', dto);

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });
  });

  describe('removeFromQueue', () => {
    it('should return success when removing a queue item', async () => {
      const result = await service.removeFromQueue('1');

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });
  });

  describe('nextInQueue', () => {
    it('should return success when advancing to the next item', async () => {
      const result = await service.nextInQueue();

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });
  });

  describe('completeQueueItem', () => {
    it('should return success when completing a queue item', async () => {
      const result = await service.completeQueueItem('1');

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });
  });
});
