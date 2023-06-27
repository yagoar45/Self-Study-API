/* eslint-disable */
/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/database/prisma.service';
import { CreateTutorDTO } from '../tutor/dtos/create-tutor.dto';
import { HashingUtil } from 'src/utils/hashing.util';
import { Injectable } from '@nestjs/common';
import { UpdateTutorDTO } from '../tutor/dtos/update-tutor.dto';
import { Tutor } from '@prisma/client';
import { errorsHelper } from 'src/helpers/errors.helper';

@Injectable()
export class TutorRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashing: HashingUtil,
  ) {}

  async create(data: CreateTutorDTO): Promise<Tutor> {
    const hashing = this.hashing.hashPassword(data.password);
    const { students, ...tutorData } = data;
    const tutor = this.prismaService.tutor.create({
      data: {
        ...tutorData,
        password: hashing,
        students: {
          create: [],
        },
      },
      include: {
        students: true,
      },
    });
    return await tutor;
  }

  async findById(id: string): Promise<Tutor | null> {
    const tutor = await this.prismaService.tutor.findUniqueOrThrow({
      where: {
        tutorId: id,
      },
      include: {
        students: true,
      },
    });
    return tutor ? tutor : null;
  }

  async findAll(): Promise<Tutor[]> {
    return await this.prismaService.tutor.findMany({
      take: 10,
      skip: 0,
      include: {
        students: true,
      },
    });
  }

  async tutorIsInDb(id: string): Promise<Boolean> {
    const tutor = await this.prismaService.tutor.findFirst({
      where: {
        tutorId: id,
      },
    });

    return tutor ? true : false;
  }

  async update(data: UpdateTutorDTO, id: string): Promise<Tutor> {
    if (this.tutorIsInDb(id)) {
      const hashing = this.hashing.hashPassword(data.password);
      const { students, ...tutorData } = data;
      const tutor = await this.prismaService.tutor.update({
        data: {
          ...tutorData,
          password: hashing,
        },

        where: {
          tutorId: id,
        },
      });

      return tutor;
    }

    throw new Error(errorsHelper.DONT_FIND_TUTOR);
  }

  async delete(id: string): Promise<Tutor> {
    if (this.tutorIsInDb(id)) {
      const tutor = await this.prismaService.tutor.delete({
        where: {
          tutorId: id,
        },
      });
      return tutor;
    }
    throw new Error('TUTOR DOESNT EXISTS');
  }
}
