import { Request } from 'express';
import { User } from 'src/users';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
