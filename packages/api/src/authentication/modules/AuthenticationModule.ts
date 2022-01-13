import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/modules/users.module';

import { AuthenticationService } from '../services/authentication.service';
import { LocalAuthenticationStrategy } from '../strategies/local-authentication.strategy';
import { JwtAuthenticationStrategy } from '../strategies/jwt-authentication.strategy';
import { AuthenticationController } from '../controllers/authentication.controller';

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
