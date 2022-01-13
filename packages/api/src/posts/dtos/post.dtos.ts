import { IsNotEmpty, IsString } from 'class-validator';
import Post from '../entities/post.entity';

export class PostCreate {
  @IsString()
  @IsNotEmpty()
  readonly content: Post['content'];

  @IsString()
  @IsNotEmpty()
  readonly title: Post['title'];
}

export class PostUpdate extends PostCreate {}
