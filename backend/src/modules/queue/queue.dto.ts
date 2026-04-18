import { IsString, IsPhoneNumber, IsNumber, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export enum QueueStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  NO_SHOW = 'noShow',
}



export interface QueueItem {
  id: string;
  clientName: string;
  phoneNumber: string;
  position: number;
  status: QueueStatus;
  /** Tiempo estimado de espera en minutos. */
  estimatedTimeMinutes: number;
  priority: boolean;
  createdAt: Date;
  queueDate: Date;
}

export interface GetQueueResponse {
  queue: QueueItem[];
  total: number;
  currentPosition: number;
  message: string;
}

export class CreateQueueDto {
  @IsString()
  clientName!: string;

  @IsPhoneNumber()
  phoneNumber!: string;

  /** Tiempo estimado de espera en minutos. Si no se provee, se usa el averageServiceTime del negocio. */
  @IsNumber()
  @IsOptional()
  estimatedTimeMinutes?: number;

  @IsBoolean()
  @IsOptional()
  priority?: boolean;
}

export class UpdateQueueDto {
  @IsEnum(QueueStatus)
  @IsOptional()
  status?: QueueStatus;

  /** Tiempo estimado de espera en minutos. */
  @IsNumber()
  @IsOptional()
  estimatedTimeMinutes?: number;

  @IsNumber()
  @IsOptional()
  position?: number;
}
