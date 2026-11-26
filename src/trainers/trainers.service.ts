import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Trainer } from './entities/trainer.entity';

@Injectable()
export class TrainersService {
  constructor(@InjectRepository(Trainer) private readonly trainers: Repository<Trainer>) {}

  findAll() { return this.trainers.find({ order: { createdAt: 'DESC' } }); }

  async findOne(id: number) {
    const trainer = await this.trainers.findOne({ where: { id } });
    if (!trainer) throw new NotFoundException('Trainer not found');
    return trainer;
  }

  async create(dto: CreateTrainerDto) {
    const email = dto.email.toLowerCase().trim();
    if (await this.trainers.findOne({ where: { email } })) {
      throw new ConflictException('A trainer with this email already exists');
    }
    return this.trainers.save(this.trainers.create({ ...dto, email, status: dto.status ?? 'active' }));
  }

  async update(id: number, dto: UpdateTrainerDto) {
    const trainer = await this.findOne(id);
    if (dto.email && dto.email.toLowerCase() !== trainer.email) {
      const exists = await this.trainers.findOne({ where: { email: dto.email.toLowerCase() } });
      if (exists) throw new ConflictException('A trainer with this email already exists');
    }
    Object.assign(trainer, { ...dto, email: dto.email?.toLowerCase() ?? trainer.email });
    return this.trainers.save(trainer);
  }

  async remove(id: number) {
    const trainer = await this.findOne(id);
    await this.trainers.remove(trainer);
    return { message: 'Trainer deleted successfully', id };
  }
}
