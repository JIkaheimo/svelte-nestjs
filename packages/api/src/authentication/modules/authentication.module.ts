import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_ACCESS_TOKEN_SECRET } from 'src/config/schemas';
import { UsersModule } from 'src/users/modules/users.module';
import { AuthenticationController } from '../controllers/authentication.controller';
import { AuthenticationService } from '../services/authentication.service';
import { JwtRefreshStrategy } from '../strategies';
import { JwtAuthenticationStrategy } from '../strategies/jwt-authentication.strategy';
import { LocalAuthenticationStrategy } from '../strategies/local-authentication.strategy';

const jwtModule = () =>
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get(JWT_ACCESS_TOKEN_SECRET),
    }),
  });

@Module({
  providers: [
    AuthenticationService,
    LocalAuthenticationStrategy,
    JwtAuthenticationStrategy,
    JwtRefreshStrategy,
  ],
  imports: [UsersModule, PassportModule, ConfigModule, jwtModule()],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
