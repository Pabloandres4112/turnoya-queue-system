import {
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { MessageDirection, MessageType, MessageStatus } from './message-log.entity';

export class CreateMessageLogDto {
  @IsString()
  phoneNumber!: string;

  @IsString()
  messageText!: string;

  @IsEnum(MessageDirection)
  direction!: MessageDirection;

  @IsEnum(MessageType)
  messageType!: MessageType;

  @IsOptional()
  @IsString()
  whatsappMessageId?: string;

  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @IsOptional()
  @IsUUID()
  queueId?: string;
}

export class UpdateMessageLogDto {
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @IsOptional()
  @IsString()
  whatsappMessageId?: string;
}

export class MessageLogResponseDto {
  id!: string;
  businessId!: string;
  phoneNumber!: string;
  messageText!: string;
  direction!: MessageDirection;
  messageType!: MessageType;
  status!: MessageStatus;
  whatsappMessageId?: string | null;
  userId?: string | null;
  queueId?: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class GetMessageLogsQueryDto {
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(MessageDirection)
  direction?: MessageDirection;

  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
