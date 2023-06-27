import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { PrismaService } from 'src/database/prisma.service';
import { LessonRepository } from '../repositories/lesson.repository';

@Module({
  controllers: [LessonController],
  providers: [LessonService, PrismaService, LessonRepository],
})
export class LessonModule {}
