import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users';
import {
  AuthenticatedRequest,
  AuthenticationService,
  JwtAuthenticationGuard,
  JwtRefreshGuard,
  LocalAuthenticationGuard,
  RegistrationData,
} from '..';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegistrationData) {
    return this.authenticationService.register(registrationData);
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  async logIn(@Req() { res, user }: AuthenticatedRequest) {
    this.authenticationService.attachAccessToken(res, user.id);
    const refreshToken = this.authenticationService.attachRefreshToken(
      res,
      user.id,
    );
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
    return user;
  }

  /**
   * Returns the user authentication info.
   */
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() { user }: AuthenticatedRequest) {
    return user;
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  async logOut(@Req() { res, user }: AuthenticatedRequest) {
    await this.usersService.removeRefreshToken(user.id);
    this.authenticationService.logoutUser(res);
    return null;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() { user, res }: AuthenticatedRequest) {
    this.authenticationService.attachAccessToken(res, user.id);
    return user;
  }
}
