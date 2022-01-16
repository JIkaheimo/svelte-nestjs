import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Post } from 'src/posts';
import { ExistsOnDatabase } from 'src/validators';

export class CommentCreate {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  @ExistsOnDatabase(Post)
  postId: Post['id'];
}

export default CommentCreate;
