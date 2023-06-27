/* eslint-disable prettier/prettier */
/* eslint-disable */
import { Student } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTutorDTO {
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

  readonly students: Array<Student>;
}
