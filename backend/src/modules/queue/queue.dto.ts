import { IsString, IsPhoneNumber, IsNumber, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export enum QueueStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  NO_SHOW = 'noShow',
}

export interface MockQueueItem {
  id: string;
  clientName: string;
  phoneNumber: string;
  position: number;
  status: string;
  estimatedTime: number;
  priority: boolean;
  createdAt: Date;
  queueDate: Date;
}

export class CreateQueueDto {
  @IsString()
  clientName!: string;

  @IsPhoneNumber()
  phoneNumber!: string;

  @IsNumber()
  @IsOptional()
  estimatedTime?: number;

  @IsBoolean()
  @IsOptional()
  priority?: boolean;
}

export class UpdateQueueDto {
  @IsEnum(QueueStatus)
  @IsOptional()
  status?: QueueStatus;

  @IsNumber()
  @IsOptional()
  estimatedTime?: number;

  @IsNumber()
  @IsOptional()
  position?: number;
}
