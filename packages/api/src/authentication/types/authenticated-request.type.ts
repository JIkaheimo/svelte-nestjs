import { Request } from 'express';
import { User } from 'src/users';

export interface AuthenticatedRequest extends Request {
  user: User;
}
