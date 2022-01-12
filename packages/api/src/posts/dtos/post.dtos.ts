import { IsNotEmpty, IsString } from 'class-validator';
import Post from '../entities/Post';

export class PostCreate {
  @IsString()
  @IsNotEmpty()
  readonly content: Post['content'];

  @IsString()
  @IsNotEmpty()
  readonly title: Post['title'];
}

export class PostUpdate extends PostCreate {}
