import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users';
import { AuthenticationService } from '../services';

/**
 * Allows the user to authenticate with the email and password.
 */
@Injectable()
export class LocalAuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: User['email'],
    password: User['password'],
  ): Promise<User> {
    // Just check that there exists an user with the given login credentials
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
