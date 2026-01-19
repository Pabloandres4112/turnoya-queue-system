import { IsString, IsEmail, IsPhoneNumber, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
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
}

export class CreateUserDto {
  @IsString()
  businessName: string;

  @IsPhoneNumber()
  whatsappNumber: string;

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
