import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export type MemberStatus = 'active' | 'inactive' | 'suspended';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', unique: true, nullable: true })
  userId: number | null;

  @Column({ name: 'first_name', length: 80 })
  firstName: string;

  @Column({ name: 'last_name', length: 80 })
  lastName: string;

  @Column({ length: 120 })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone: string | null;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  gender: string | null;

  @Column({ name: 'membership_start', type: 'date', nullable: true })
  membershipStart: string | null;

  @Column({ name: 'membership_end', type: 'date', nullable: true })
  membershipEnd: string | null;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'suspended'], default: 'active' })
  status: MemberStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.member, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null;
}
