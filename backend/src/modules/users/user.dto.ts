import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserSettingsDto {
  @IsNumber()
  @IsOptional()
  averageServiceTime?: number;

  @IsBoolean()
  @IsOptional()
  automationEnabled?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  excludedContacts?: string[];

  @IsNumber()
  @IsOptional()
  maxDaysAhead?: number;

  @IsBoolean()
  @IsOptional()
  queuePaused?: boolean;
}

export class CreateUserDto {
  @IsString()
  businessName!: string;

  @IsPhoneNumber()
  whatsappNumber!: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  businessName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @ValidateNested()
  @Type(() => UserSettingsDto)
  @IsOptional()
  settings?: UserSettingsDto;
}

/**
 * DTO para agregar un contacto a la lista de exclusión.
 * Formato E.164: +57XXXXXXXXXX
 */
export class AddExcludedContactDto {
  @IsPhoneNumber()
  phoneNumber!: string;
}

/**
 * DTO para remover un contacto de la lista de exclusión.
 */
export class RemoveExcludedContactDto {
  @IsPhoneNumber()
  phoneNumber!: string;
}

/**
 * Respuesta con la lista actualizada de contactos excluidos.
 */
export class ExcludedContactsResponseDto {
  success: boolean;
  message: string;
  excludedContacts: string[];
}
