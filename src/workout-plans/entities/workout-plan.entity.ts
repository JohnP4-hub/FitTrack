import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Member } from '../../members/entities/member.entity';
import { Trainer } from '../../trainers/entities/trainer.entity';

export type WorkoutPlanStatus = 'draft' | 'active' | 'completed' | 'archived';

@Entity('workout_plans')
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'member_id' })
  memberId: number;

  @Column({ name: 'trainer_id', type: 'int', nullable: true })
  trainerId: number | null;

  @Column({ length: 140 })
  title: string;

  @Column({ length: 80 })
  goal: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' })
  level: 'beginner' | 'intermediate' | 'advanced';

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: string | null;

  @Column({ type: 'enum', enum: ['draft', 'active', 'completed', 'archived'], default: 'draft' })
  status: WorkoutPlanStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Trainer, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer | null;
}
