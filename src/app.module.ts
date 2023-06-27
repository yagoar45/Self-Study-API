import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { TutorModule } from './modules/tutor/tutor.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { HashingUtil } from './utils/hashing.util';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [StudentModule, TutorModule, LessonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
