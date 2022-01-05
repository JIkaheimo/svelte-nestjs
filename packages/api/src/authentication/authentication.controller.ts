import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto } from 'src/users/dto/UserCreateDto';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './authentication.local.guard';
import RequestWithUser from './authentication.types';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() userData: UserCreateDto) {
    return this.authenticationService.register(userData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
