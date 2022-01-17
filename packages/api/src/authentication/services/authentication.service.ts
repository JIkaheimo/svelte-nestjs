import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Response } from 'express';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
} from 'src/config';
import { User, UsersService } from 'src/users';
import { JwtPayload, RegistrationData } from '..';

@Injectable()
export class AuthenticationService {
  private accessExpiration: number;
  private accessSecret: string;
  private refreshExpiration: number;
  private refreshSecret: string;

  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.accessSecret = config.get(JWT_ACCESS_TOKEN_SECRET);
    this.accessExpiration = config.get(JWT_ACCESS_TOKEN_EXPIRATION_TIME);
    this.refreshSecret = config.get(JWT_REFRESH_TOKEN_SECRET);
    this.refreshExpiration = config.get(JWT_REFRESH_TOKEN_EXPIRATION_TIME);
  }

  /**
   * Registers or creates a new user.
   */
  async register(registrationData: RegistrationData) {
    const passwordHash = await hash(registrationData.password, 10);
    return await this.users.create({
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
    const user = await this.users.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid login credentials.');
    }
    await this.verifyPassword(password, user.password);
    return user;
  }

  /**
   * Authenticates (or logins) the user.
   */
  attachAccessToken(response: Response, userId: User['id']) {
    const token = this.jwt.sign({ userId } as JwtPayload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiration,
    });

    response.cookie('Authentication', token, {
      maxAge: this.accessExpiration,
    });

    return token;
  }

  async getUserFromAuthenticationToken(token: string): Promise<User | null> {
    const { userId } = this.jwt.verify<JwtPayload>(token, {
      secret: this.config.get(JWT_ACCESS_TOKEN_SECRET),
    });

    if (!userId) return null;

    return this.users.findById(userId);
  }

  attachRefreshToken(response: Response, userId: User['id']) {
    const payload: JwtPayload = { userId };

    const token = this.jwt.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiration,
    });

    response.cookie('Refresh', token, {
      maxAge: this.refreshExpiration,
    });

    return token;
  }

  /**
   * Logouts the user.
   */
  logoutUser(response: Response): Response {
    return response.clearCookie('Authentication').clearCookie('Refresh');
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
  ): Promise<void> {
    const passwordsMatch = await compare(plainPassword, hashedPassword);
    if (!passwordsMatch) {
      throw new BadRequestException('Invalid login credentials.');
    }
  }
}
