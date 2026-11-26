import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ProgressRecord } from './entities/progress-record.entity';

@Injectable()
export class ProgressService {
  constructor(@InjectRepository(ProgressRecord) private readonly progress: Repository<ProgressRecord>) {}

  findAll() {
    return this.progress.find({ relations: { member: true }, order: { recordedAt: 'DESC' } });
  }

  async findOne(id: number) {
    const record = await this.progress.findOne({ where: { id }, relations: { member: true } });
    if (!record) throw new NotFoundException('Progress record not found');
    return record;
  }

  create(dto: CreateProgressDto) { return this.progress.save(this.progress.create(dto)); }

  async update(id: number, dto: UpdateProgressDto) {
    const record = await this.findOne(id);
    Object.assign(record, dto);
    return this.progress.save(record);
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    await this.progress.remove(record);
    return { message: 'Progress record deleted successfully', id };
  }
}
