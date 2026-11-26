import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Member } from '../members/entities/member.entity';

type SafeUser = Omit<User, 'passwordHash'>;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Member) private readonly members: Repository<Member>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.users.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email is already registered');

    const user = this.users.create({
      email,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      passwordHash: await bcrypt.hash(dto.password, 12),
      role: UserRole.MEMBER,
      isActive: true,
    });
    const saved = await this.users.save(user);

    await this.members.save(
      this.members.create({
        userId: saved.id,
        firstName: saved.firstName,
        lastName: saved.lastName,
        email: saved.email,
        status: 'active',
      }),
    );

    return this.issueToken(saved);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email.toLowerCase().trim() } });
    if (!user || !user.isActive || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.issueToken(user);
  }

  async getProfile(userId: number) {
    const user = await this.users.findOne({ where: { id: userId }, relations: { member: true } });
    if (!user) throw new UnauthorizedException('User no longer exists');
    return this.safeUser(user);
  }

  private async issueToken(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwt.signAsync(payload),
      tokenType: 'Bearer',
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN', '1d'),
      user: this.safeUser(user),
    };
  }

  private safeUser(user: User): SafeUser {
    const { passwordHash: _passwordHash, ...safe } = user;
    return safe;
  }
}
