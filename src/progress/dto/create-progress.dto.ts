import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProgressDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  memberId: number;

  @IsDateString()
  recordedAt: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  weightKg: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  bodyFatPercent?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  muscleMassKg?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
