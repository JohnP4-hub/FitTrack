import { IsDateString, IsIn, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateWorkoutPlanDto {
  @IsInt()
  @Min(1)
  memberId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  trainerId?: number;

  @IsString()
  @Length(3, 140)
  title: string;

  @IsString()
  @Length(2, 80)
  goal: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(['beginner', 'intermediate', 'advanced'])
  level: 'beginner' | 'intermediate' | 'advanced';

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsIn(['draft', 'active', 'completed', 'archived'])
  status?: 'draft' | 'active' | 'completed' | 'archived';
}
