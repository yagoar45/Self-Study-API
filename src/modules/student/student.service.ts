import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { errorsHelper } from 'src/helpers/errors.helper';
import { ReadStudentDTO } from './dtos/read-student.dto';
import { HashingUtil } from 'src/utils/hashing.util';

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashing: HashingUtil,
  ) {}
}
