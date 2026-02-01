import {IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength} from 'class-validator';

export class LoginDto {
  @IsString()
  identifier!: string;

  @IsString()
  password!: string;
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
