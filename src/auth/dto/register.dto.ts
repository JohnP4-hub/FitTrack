import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(2, 80)
  firstName: string;

  @IsString()
  @Length(2, 80)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 72)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'password must contain at least one letter and one number',
  })
  password: string;
}
