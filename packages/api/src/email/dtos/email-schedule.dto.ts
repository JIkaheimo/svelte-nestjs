import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailSchedule {
  @IsEmail()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}

export default EmailSchedule;
