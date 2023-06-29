import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Patch,
  ParseBoolPipe,
} from '@nestjs/common';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { StudentRepository } from '../repositories/student.repository';
import { Lesson, Student } from '@prisma/client';
import { UpdateStudentDTO } from './dtos/update-student.dto';
import { StudentService } from './student.service';

@Controller('api/v1/')
export class StudentController {
  constructor(
    private readonly repository: StudentRepository,
    private readonly service: StudentService,
  ) {}

  @Post('/student/:id')
  async createStudent(
    @Body() data: CreateStudentDTO,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Student> {
    return await this.repository.create(data, id);
  }

  @Get('/students')
  async findAllStudents(): Promise<Student[]> {
    return await this.repository.findAll();
  }

  @Get('/student/:id')
  async findByIdStudent(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Student> {
    return await this.repository.findById(id);
  }

  @Put('/student/:id')
  async updateStudent(
    @Body() data: UpdateStudentDTO,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Student> {
    return await this.repository.update(data, id);
  }

  @Patch('/student/:id')
  async softDeletionStudent(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Student> {
    return await this.repository.softDeletation(id);
  }

  @Patch('/student/:studentId/lesson/:lessonId')
  async addLessonForAStudent(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
    @Param('lessonId', new ParseUUIDPipe()) lessonId: string,
  ): Promise<Student> {
    return await this.service.addLessonForStudent(studentId, lessonId);
  }

  @Patch('/student/:studentId/changeLesson/:lessonId')
  async addLessonConcluededForAStudent(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
    @Param('lessonId', new ParseUUIDPipe()) lessonId: string,
    @Param('state', new ParseBoolPipe()) state: boolean,
  ): Promise<Lesson[]> {
    return await this.service.lessonConcluded(studentId, lessonId, state);
  }
}
