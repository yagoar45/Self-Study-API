import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { HashingUtil } from 'src/utils/hashing.util';
import { PrismaService } from 'src/database/prisma.service';
import { TutorRepository } from '../repositories/tutor.repository';
@Module({
  controllers: [TutorController],
  providers: [TutorService, HashingUtil, PrismaService, TutorRepository],
})
export class TutorModule {}
