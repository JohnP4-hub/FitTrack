import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Member } from '../../members/entities/member.entity';
import { Trainer } from '../../trainers/entities/trainer.entity';
import { WorkoutPlan } from '../../workout-plans/entities/workout-plan.entity';

export type ScheduleStatus = 'scheduled' | 'completed' | 'cancelled';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'member_id' })
  memberId: number;

  @Column({ name: 'trainer_id', type: 'int', nullable: true })
  trainerId: number | null;

  @Column({ name: 'workout_plan_id', type: 'int', nullable: true })
  workoutPlanId: number | null;

  @Column({ name: 'scheduled_at', type: 'datetime' })
  scheduledAt: Date;

  @Column({ name: 'duration_minutes', type: 'int', default: 60 })
  durationMinutes: number;

  @Column({ name: 'session_type', length: 80 })
  sessionType: string;

  @Column({ type: 'enum', enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' })
  status: ScheduleStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

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

  @ManyToOne(() => WorkoutPlan, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'workout_plan_id' })
  workoutPlan: WorkoutPlan | null;
}
