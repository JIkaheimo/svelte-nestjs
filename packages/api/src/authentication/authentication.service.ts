import { BadRequestException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users';
import { UserCreateDto } from '../users/dto/UserCreateDto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async register(userData: UserCreateDto) {
    const passwordHash = await hash(userData.password, 10);
    return await this.usersService.create({
      ...userData,
      password: passwordHash,
    });
  }

  async getAuthenticatedUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    await this.verifyPassword(password, user.password);
    return user;
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    const passwordsMatch = await compare(plainPassword, hashedPassword);
    if (!passwordsMatch) {
      throw new BadRequestException('Invalid login credentials.');
    }
  }
}
