import { User } from 'src/users';

export interface JwtPayload {
  userId: User['id'];
}
