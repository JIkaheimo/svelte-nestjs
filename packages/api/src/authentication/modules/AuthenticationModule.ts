import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/modules/UsersModule';

import { AuthenticationService } from '../services/AuthenticationService';
import { LocalAuthenticationStrategy } from '../strategies/LocalAuthenticationStrategy';
import { JwtAuthenticationStrategy } from '../strategies/JwtAuthenticationStrategy';
import { AuthenticationController } from '../controllers/AuthenticationController';

const jwtModule = () =>
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
    }),
  });

@Module({
  providers: [
    AuthenticationService,
    LocalAuthenticationStrategy,
    JwtAuthenticationStrategy,
  ],
  imports: [UsersModule, PassportModule, ConfigModule, jwtModule()],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
