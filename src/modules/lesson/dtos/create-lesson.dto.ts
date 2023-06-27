/* eslint-disable */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, ValidateNested } from 'class-validator';

export enum AlternativesLetter {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
  E = 'e',
}

export interface Alternatives {
  letter: AlternativesLetter;
  text: string;
}

export class CreateLessonDTO {
  @IsNotEmpty()
  readonly topic: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly alternatives: Alternatives[];
}
