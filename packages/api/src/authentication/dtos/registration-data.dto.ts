import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/users';
import { UniqueOnDatabase } from 'src/validators';

export class RegistrationData {
  @ApiProperty()
  @IsEmail()
  @UniqueOnDatabase(User)
  readonly email: User['email'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @UniqueOnDatabase(User)
  readonly username: User['username'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password: User['password'];
}
