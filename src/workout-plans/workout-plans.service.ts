import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { UpdateWorkoutPlanDto } from './dto/update-workout-plan.dto';
import { WorkoutPlan } from './entities/workout-plan.entity';

@Injectable()
export class WorkoutPlansService {
  constructor(@InjectRepository(WorkoutPlan) private readonly plans: Repository<WorkoutPlan>) {}

  findAll() {
    return this.plans.find({ relations: { member: true, trainer: true }, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const plan = await this.plans.findOne({ where: { id }, relations: { member: true, trainer: true } });
    if (!plan) throw new NotFoundException('Workout plan not found');
    return plan;
  }

  create(dto: CreateWorkoutPlanDto) {
    return this.plans.save(this.plans.create({ ...dto, status: dto.status ?? 'draft' }));
  }

  async update(id: number, dto: UpdateWorkoutPlanDto) {
    const plan = await this.findOne(id);
    Object.assign(plan, dto);
    return this.plans.save(plan);
  }

  async remove(id: number) {
    const plan = await this.findOne(id);
    await this.plans.remove(plan);
    return { message: 'Workout plan deleted successfully', id };
  }
}
