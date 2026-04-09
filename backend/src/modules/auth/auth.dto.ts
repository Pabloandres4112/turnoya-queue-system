import { IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  identifier!: string;

  @IsString()
  password!: string;
}

export interface AuthenticatedUser {
  id: string;
  role: string;
  businessName: string;
  whatsappNumber: string;
  email: string | null;
  settings: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

export class RegisterDto {
  @IsString()
  businessName!: string;

  @IsPhoneNumber()
  whatsappNumber!: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
