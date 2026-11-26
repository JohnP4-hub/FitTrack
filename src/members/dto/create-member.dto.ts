import { IsDateString, IsEmail, IsIn, IsOptional, IsString, Length } from 'class-validator';

export class CreateMemberDto {
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

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  gender?: string;

  @IsOptional()
  @IsDateString()
  membershipStart?: string;

  @IsOptional()
  @IsDateString()
  membershipEnd?: string;

  @IsOptional()
  @IsIn(['active', 'inactive', 'suspended'])
  status?: 'active' | 'inactive' | 'suspended';
}
