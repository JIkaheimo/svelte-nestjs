import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthenticationService } from '../services/AuthenticationService';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import { RegistrationData } from '../dtos/RegistrationData';
import { LocalAuthenticationGuard } from '../guards/LocalAuthenticationGuard';
import { JwtAuthenticationGuard } from '../guards/JwtAuthenticationGuard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegistrationData) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() { res, user }: AuthenticatedRequest) {
    this.authenticationService.authenticateUser(res, user.id);

    return user;
  }

  /**
   * Returns the user authentication info.
   */
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() { user }: AuthenticatedRequest) {
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(200)
  @Post('logout')
  async logOut(@Req() { res }: AuthenticatedRequest) {
    return this.authenticationService.logoutUser(res);
  }
}
