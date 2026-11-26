import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateScheduleDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  memberId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  trainerId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  workoutPlanId?: number;

  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(15)
  durationMinutes?: number;

  @IsString()
  @Length(2, 80)
  sessionType: string;

  @IsOptional()
  @IsIn(['scheduled', 'completed', 'cancelled'])
  status?: 'scheduled' | 'completed' | 'cancelled';

  @IsOptional()
  @IsString()
  notes?: string;
}
