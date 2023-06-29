import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../repositories/student.repository';
import { LessonRepository } from '../repositories/lesson.repository';
import { PrismaService } from 'src/database/prisma.service';
import { Lesson, Student } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly studentRepository: StudentRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async addLessonForStudent(
    studentId: string,
    lessonId: string,
  ): Promise<Student> {
    const student = await this.studentRepository.findById(studentId);
    const lesson = await this.lessonRepository.findById(lessonId);
    let studentWithLessonAdded: Student;
    if (lesson && student) {
      studentWithLessonAdded = await this.prismaService.student.update({
        where: {
          studentId: student.studentId,
        },
        data: {
          lessons: {
            connect: {
              lessonId: lesson.lessonId,
            },
          },
        },
        include: {
          lessons: true,
        },
      });
    }
    return studentWithLessonAdded;
  }

  async lessonConcluded(
    studentId: string,
    lessonId: string,
    lessonState: boolean,
  ): Promise<Lesson[]> {
    const student = await this.studentRepository.findById(studentId);
    const lesson = await this.lessonRepository.findById(lessonId);

    const studentWithLessonConclueded = await this.prismaService.student.update(
      {
        where: {
          studentId: student.studentId,
        },
        data: {
          lessons: {
            update: {
              where: {
                lessonId: lesson.lessonId,
              },
              data: {
                isDone: lessonState,
              },
            },
          },
        },
        include: {
          lessons: true,
        },
      },
    );

    const result = studentWithLessonConclueded.lessons.filter(
      (onlyLessonAsTrue) => onlyLessonAsTrue.isDone == true,
    );
    return result;
  }
}
