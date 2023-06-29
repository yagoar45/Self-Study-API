import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LessonRepository } from '../repositories/lesson.repository';

@Injectable()
export class LessonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly repository: LessonRepository,
  ) {}
}
