/* eslint-disable */
/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
export class UpdateStudentDTO {
  @IsNotEmpty()
  @MinLength(4, { message: 'username must be at least four characters long' })
  @MaxLength(80, { message: 'username cannot be longer than 80 characters' })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}
