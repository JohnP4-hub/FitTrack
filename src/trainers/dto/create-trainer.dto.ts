import { IsEmail, IsIn, IsOptional, IsString, Length } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  @Length(2, 80)
  firstName: string;

  @IsString()
  @Length(2, 80)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(7, 30)
  phone?: string;

  @IsString()
  @Length(2, 120)
  specialization: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
