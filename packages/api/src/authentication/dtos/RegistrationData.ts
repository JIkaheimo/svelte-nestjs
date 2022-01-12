import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/users/entities/User';
import { UniqueOnDatabase } from '../../validators';

export class RegistrationData {
  @IsEmail()
  @UniqueOnDatabase(User)
  readonly email: User['email'];

  @IsString()
  @IsNotEmpty()
  @UniqueOnDatabase(User)
  readonly username: User['username'];

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password: User['password'];
}
