import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private readonly members: Repository<Member>) {}

  findAll() {
    return this.members.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const member = await this.members.findOne({ where: { id } });
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }

  async create(dto: CreateMemberDto) {
    const email = dto.email.toLowerCase().trim();
    const exists = await this.members.findOne({ where: { email } });
    if (exists) throw new ConflictException('A member with this email already exists');
    return this.members.save(this.members.create({ ...dto, email, status: dto.status ?? 'active' }));
  }

  async update(id: number, dto: UpdateMemberDto) {
    const member = await this.findOne(id);
    if (dto.email && dto.email.toLowerCase() !== member.email) {
      const exists = await this.members.findOne({ where: { email: dto.email.toLowerCase() } });
      if (exists) throw new ConflictException('A member with this email already exists');
    }
    Object.assign(member, { ...dto, email: dto.email?.toLowerCase() ?? member.email });
    return this.members.save(member);
  }

  async remove(id: number) {
    const member = await this.findOne(id);
    await this.members.remove(member);
    return { message: 'Member deleted successfully', id };
  }
}
