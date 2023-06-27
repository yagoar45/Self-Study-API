import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Patch,
} from '@nestjs/common';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { StudentRepository } from '../repositories/student.repository';
import { Student } from '@prisma/client';
import { UpdateStudentDTO } from './dtos/update-student.dto';

@Controller('api/v1/')
export class StudentController {
  constructor(private readonly repository: StudentRepository) {}

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
  async findByIdStudent(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.repository.findById(id);
  }

  @Put('/student/:id')
  async updateStudent(
    @Body() data: UpdateStudentDTO,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.repository.update(data, id);
  }

  @Patch('/student/:id')
  async softDeletionStudent(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.repository.softDeletation(id);
  }
}
