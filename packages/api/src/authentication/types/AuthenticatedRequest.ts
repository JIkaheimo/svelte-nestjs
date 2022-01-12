import { Request } from 'express';
import { User } from 'src/users/entities';

export interface AuthenticatedRequest extends Request {
  user: User;
}
