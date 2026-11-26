import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { UpdateWorkoutPlanDto } from './dto/update-workout-plan.dto';
import { WorkoutPlansService } from './workout-plans.service';

@Controller('workout-plans')
@UseGuards(JwtAuthGuard)
export class WorkoutPlansController {
  constructor(private readonly plans: WorkoutPlansService) {}

  @Get()
  findAll() { return this.plans.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.plans.findOne(id); }

  @Post()
  create(@Body() dto: CreateWorkoutPlanDto) { return this.plans.create(dto); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWorkoutPlanDto) { return this.plans.update(id, dto); }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.plans.remove(id); }
}
