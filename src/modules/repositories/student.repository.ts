/* eslint-disable */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStudentDTO } from '../student/dtos/create-student.dto';
import { Student } from '@prisma/client';
import { HashingUtil } from 'src/utils/hashing.util';
import { UpdateStudentDTO } from '../student/dtos/update-student.dto';

@Injectable()
export class StudentRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashing: HashingUtil,
  ) {}

  async create(data: CreateStudentDTO, tutorId: string): Promise<Student> {
    const hashing = this.hashing.hashPassword(data.password);
    const student = await this.prismaService.student.create({
      data: {
        ...data,
        password: hashing,
        tutor: {
          create: undefined,
          connect: { tutorId: tutorId },
        },
        lessons: {
          create: [],
        },
      },
      include: {
        tutor: true,
        lessons: true,
      },
    });
    return student;
  }

  async findAll(): Promise<Student[]> {
    return await this.prismaService.student.findMany({
      skip: 0,
      take: 10,
      include: {
        lessons: true,
      },
    });
  }

  async findById(id: string): Promise<Student> {
    const student = await this.prismaService.student.findUniqueOrThrow({
      where: {
        studentId: id,
      },
      include: {
        lessons: true,
      },
    });

    return student;
  }

  async studentIsInDb(id: string): Promise<boolean> {
    const student = await this.prismaService.student.findUniqueOrThrow({
      where: {
        studentId: id,
      },
    });
    return student ? true : false;
  }

  async update(data: UpdateStudentDTO, id: string): Promise<Student> {
    if (this.studentIsInDb(id)) {
      const hashing = this.hashing.hashPassword(data.password);
      return await this.prismaService.student.update({
        data: {
          ...data,
          password: hashing,
        },
        where: {
          studentId: id,
        },
      });
    }
  }

  async softDeletation(id: string) {
    return await this.prismaService.student.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        studentId: id,
      },
    });
  }
}
