import { Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './authentication.local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './authentication.controller';

@Module({
  providers: [AuthenticationService, LocalStrategy],
  imports: [UsersModule, PassportModule],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
