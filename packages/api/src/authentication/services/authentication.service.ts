import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Response } from 'express';

import { UsersService, User } from 'src/users';

import { JwtPayload, RegistrationData } from '..';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers or creates a new user.
   */
  async register(registrationData: RegistrationData) {
    const passwordHash = await hash(registrationData.password, 10);
    return await this.usersService.create({
      ...registrationData,
      password: passwordHash,
    });
  }

  /**
   * Returns the user with the given email and password.
   *
   * @throws {BadRequestException}
   */
  async getAuthenticatedUser(email: User['email'], password: User['password']) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid login credentials.');
    }
    await this.verifyPassword(password, user.password);
    return user;
  }

  authenticateUser(response: Response, userId: User['id']): Response {
    const token = this.jwtService.sign({ userId } as JwtPayload);
    return response.cookie('Authentication', token);
  }

  logoutUser(response: Response): Response {
    return response.clearCookie('Authentication');
  }

  /**
   * Compares the given plain and hashed passwords. If they do not match
   * throws an error.
   *
   * @throws {BadRequestException}
   */
  private async verifyPassword(
    plainPassword: User['password'],
    hashedPassword: User['password'],
  ) {
    const passwordsMatch = await compare(plainPassword, hashedPassword);
    if (!passwordsMatch) {
      throw new BadRequestException('Invalid login credentials.');
    }
  }
}
