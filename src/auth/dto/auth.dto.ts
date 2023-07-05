import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  firstName?: string;
  @IsOptional()
  lastName?: string;
  @IsOptional()
  street?: string;
  @IsOptional()
  city?: string;
  @IsOptional()
  country?: string;
}
