import { User } from 'src/users/entities';

export interface JwtPayload {
  userId: User['id'];
}
