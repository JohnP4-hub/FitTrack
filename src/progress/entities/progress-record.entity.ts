import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Member } from '../../members/entities/member.entity';

@Entity('progress_records')
export class ProgressRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'member_id' })
  memberId: number;

  @Column({ name: 'recorded_at', type: 'date' })
  recordedAt: string;

  @Column({ name: 'weight_kg', type: 'decimal', precision: 6, scale: 2 })
  weightKg: number;

  @Column({ name: 'body_fat_percent', type: 'decimal', precision: 5, scale: 2, nullable: true })
  bodyFatPercent: number | null;

  @Column({ name: 'muscle_mass_kg', type: 'decimal', precision: 6, scale: 2, nullable: true })
  muscleMassKg: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
