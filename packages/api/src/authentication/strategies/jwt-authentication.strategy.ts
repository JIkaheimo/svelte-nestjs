import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_ACCESS_TOKEN_SECRET } from 'src/config';
import { UsersService } from 'src/users';
import { JwtPayload } from '..';

@Injectable()
export class JwtAuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get(JWT_ACCESS_TOKEN_SECRET),
    });
  }

  async validate({ userId }: JwtPayload) {
    return this.userService.findById(userId);
  }
}

export default JwtAuthenticationStrategy;
