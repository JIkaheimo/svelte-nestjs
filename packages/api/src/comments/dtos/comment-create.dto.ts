import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Post } from 'src/posts';
import { ExistsOnDatabase } from 'src/validators';

export class CommentCreate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @ExistsOnDatabase(Post)
  postId: Post['id'];
}

export default CommentCreate;
