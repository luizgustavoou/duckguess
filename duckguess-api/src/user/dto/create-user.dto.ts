import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/user-role';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(5)
  @MaxLength(20)
  password: string;

  @IsOptional()
  // @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(UserRole)
  roleUser: UserRole;
}
