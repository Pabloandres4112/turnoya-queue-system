import { IsString, IsEnum, IsOptional, IsObject, IsUUID } from 'class-validator';

export enum NotificationType {
  NEW_TURN = 'new-turn',
  TURN_COMPLETED = 'turn-completed',
  QUEUE_UPDATE = 'queue-update',
  NEXT_TURN = 'next-turn',
}

export class SendNotificationDto {
  @IsUUID()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}
