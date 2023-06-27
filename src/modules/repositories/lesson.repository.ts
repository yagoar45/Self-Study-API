/* eslint-disable */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateLessonDTO } from '../lesson/dtos/create-lesson.dto';
import { Lesson } from '@prisma/client';
import { UpdateLessonDTO } from '../lesson/dtos/update-lesson.dto';

@Injectable()
export class LessonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateLessonDTO): Promise<Lesson> {
    const lesson = await this.prismaService.lesson.create({
      data: {
        topic: data.topic,
        description: data.description,
        alternatives: data.alternatives.map((alternative) => ({
          letter: alternative.letter,
          text: alternative.text,
        })),
      },
    });

    return lesson;
  }

  async findAll() {
    return await this.prismaService.lesson.findMany({ skip: 0, take: 10 });
  }

  async findById(id: string) {
    if (this.lessonIsInDb(id)) {
      const lesson = await this.prismaService.lesson.findUniqueOrThrow({
        where: {
          lessonId: id,
        },
      });
      return lesson;
    }
  }

  async lessonIsInDb(id: string) {
    const lesson = await this.prismaService.lesson.findUniqueOrThrow({
      where: {
        lessonId: id,
      },
    });

    return lesson ? true : false;
  }

  async update(data: UpdateLessonDTO, id: string) {
    if (this.lessonIsInDb(id)) {
      const lesson = await this.prismaService.lesson.update({
        where: {
          lessonId: id,
        },
        data: {
          description: data.description,
          alternatives: data.alternatives.map((alternative) => ({
            letter: alternative.letter,
            text: alternative.text,
          })),
        },
      });

      return lesson;
    }
  }

  async delete(id: string) {
    if (this.lessonIsInDb(id)) {
      const lesson = await this.prismaService.lesson.delete({
        where: {
          lessonId: id,
        },
      });

      return lesson;
    }
  }
}
