import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TutorRepository } from '../repositories/tutor.repository';
import { CreateTutorDTO } from './dtos/create-tutor.dto';
import { UpdateTutorDTO } from './dtos/update-tutor.dto';
import { Tutor } from '@prisma/client';

@Controller('api/v1/')
export class TutorController {
  constructor(private readonly repository: TutorRepository) {}

  @Post('/tutor')
  async createTutor(@Body() data: CreateTutorDTO): Promise<Tutor> {
    return await this.repository.create(data);
  }

  @Get('/tutors')
  async findAllTutors(): Promise<Tutor[]> {
    return await this.repository.findAll();
  }

  @Get('/tutor/:id')
  async findUniqueTutor(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Tutor> {
    return await this.repository.findById(id);
  }

  @Put('/tutor/:id')
  async updateTutor(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateTutorDTO,
  ): Promise<Tutor> {
    return await this.repository.update(data, id);
  }

  @Delete('/tutor/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<Tutor> {
    return await this.repository.delete(id);
  }
}
