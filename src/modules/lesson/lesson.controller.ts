import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  ParseUUIDPipe,
  Body,
} from '@nestjs/common';
import { CreateLessonDTO } from './dtos/create-lesson.dto';
import { LessonRepository } from '../repositories/lesson.repository';
import { UpdateLessonDTO } from './dtos/update-lesson.dto';

@Controller('api/v1')
export class LessonController {
  constructor(private readonly repository: LessonRepository) {}

  @Post('/lesson')
  async createLesson(@Body() data: CreateLessonDTO) {
    return await this.repository.create(data);
  }

  @Get('/lessons')
  async findAllLesson() {
    return await this.repository.findAll();
  }

  @Get('/lesson/:id')
  async findLessonById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.repository.findById(id);
  }

  @Put('/lesson/:id')
  async updateLesson(
    @Body() data: UpdateLessonDTO,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.repository.update(data, id);
  }

  @Delete('/lesson/:id')
  async deleteLesson(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.repository.delete(id);
  }
}
