import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para el valor de un campo en el webhook
 */
class WebhookValue {
  @IsString()
  @IsOptional()
  messaging_product?: string;

  @IsArray()
  @IsOptional()
  messages?: Array<{
    from: string;
    id: string;
    timestamp: string;
    type: string;
    text?: { body: string };
  }>;

  @IsArray()
  @IsOptional()
  statuses?: Array<{
    id: string;
    status: string;
    timestamp: string;
    recipient_id: string;
  }>;

  @IsString()
  @IsOptional()
  from?: string;

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  timestamp?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsOptional()
  text?: { body: string };
}

/**
 * DTO para un cambio en el webhook
 */
class WebhookChange {
  @IsString()
  value!: string | WebhookValue;

  @IsString()
  field!: string;
}

/**
 * DTO para una entrada en el webhook
 */
class WebhookEntry {
  @IsString()
  id!: string;

  @IsArray()
  @ValidateNested()
  @Type(() => WebhookChange)
  changes!: WebhookChange[];
}

/**
 * DTO para el webhook de Meta Cloud API
 * https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/overview
 */
export class WhatsAppWebhookDto {
  @IsString()
  object!: string;

  @IsArray()
  @ValidateNested()
  @Type(() => WebhookEntry)
  entry!: WebhookEntry[];
}

/**
 * DTO para la verificación GET del webhook
 */
export class WebhookVerificationDto {
  @IsString()
  'hub.mode': string;

  @IsString()
  'hub.challenge': string;

  @IsString()
  'hub.verify_token': string;
}

/**
 * Respuesta del webhook
 */
export class WebhookResponseDto {
  success: boolean;
  message: string;
}
