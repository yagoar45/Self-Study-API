import { Injectable } from '@nestjs/common';
import { TutorRepository } from '../repositories/tutor.repository';

@Injectable()
export class TutorService {
  constructor(private readonly repository: TutorRepository) {}

  // aqui vai ficar as classes que tem serviços mais específicos (NÃO CRUD)
}
