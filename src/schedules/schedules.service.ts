import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(@InjectRepository(Schedule) private readonly schedules: Repository<Schedule>) {}

  findAll() {
    return this.schedules.find({
      relations: { member: true, trainer: true, workoutPlan: true },
      order: { scheduledAt: 'ASC' },
    });
  }

  async findOne(id: number) {
    const schedule = await this.schedules.findOne({
      where: { id },
      relations: { member: true, trainer: true, workoutPlan: true },
    });
    if (!schedule) throw new NotFoundException('Schedule not found');
    return schedule;
  }

  create(dto: CreateScheduleDto) {
    return this.schedules.save(
      this.schedules.create({
        ...dto,
        scheduledAt: new Date(dto.scheduledAt),
        durationMinutes: dto.durationMinutes ?? 60,
        status: dto.status ?? 'scheduled',
      }),
    );
  }

  async update(id: number, dto: UpdateScheduleDto) {
    const schedule = await this.findOne(id);
    Object.assign(schedule, {
      ...dto,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : schedule.scheduledAt,
    });
    return this.schedules.save(schedule);
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    await this.schedules.remove(schedule);
    return { message: 'Schedule deleted successfully', id };
  }
}
