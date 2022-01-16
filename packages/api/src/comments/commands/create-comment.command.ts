import { User } from 'src/users';
import CommentCreate from '../dtos/comment-create.dto';

export class CreateCommentCommand {
  constructor(
    public readonly comment: CommentCreate,
    public readonly author: User,
  ) {}
}

export default CreateCommentCommand;
