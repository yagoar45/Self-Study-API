import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { HashingUtil } from 'src/utils/hashing.util';
import { PrismaService } from 'src/database/prisma.service';
import { StudentRepository } from '../repositories/student.repository';

@Module({
  controllers: [StudentController],
  providers: [StudentService, HashingUtil, PrismaService, StudentRepository],
})
export class StudentModule {}
