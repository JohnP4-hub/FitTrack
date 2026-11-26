import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainersService } from './trainers.service';

@Controller('trainers')
@UseGuards(JwtAuthGuard)
export class TrainersController {
  constructor(private readonly trainers: TrainersService) {}

  @Get()
  findAll() { return this.trainers.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.trainers.findOne(id); }

  @Post()
  create(@Body() dto: CreateTrainerDto) { return this.trainers.create(dto); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTrainerDto) { return this.trainers.update(id, dto); }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.trainers.remove(id); }
}
