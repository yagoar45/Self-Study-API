/* eslint-disable */
/* eslint-disable prettier/prettier */
import { Student } from '@prisma/client';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export enum AlternativesLetter {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
  E = 'e',
}

export class Alternatives {
  @IsNotEmpty()
  letter: AlternativesLetter;
  @IsNotEmpty()
  text: string;
}

export class UpdateLessonDTO {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  alternatives: Alternatives[];
}
