export class CreateQueueDto {
  clientName: string;
  phoneNumber: string;
  estimatedTime?: number;
  priority?: boolean;
}

export class UpdateQueueDto {
  status?: 'waiting' | 'in-progress' | 'completed' | 'no-show';
  estimatedTime?: number;
  position?: number;
}

export enum QueueStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  NO_SHOW = 'no-show'
}
