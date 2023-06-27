/* eslint-disable */
/* eslint-disable prettier/prettier */
import { Student } from '@prisma/client';
import {
    IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateTutorDTO {
  @IsNotEmpty()
  @MinLength(4, { message: 'username must be at least four characters long' })
  @MaxLength(40, { message: 'username cannot be longer than 40 characters' })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;

  readonly students: Student[]
}
