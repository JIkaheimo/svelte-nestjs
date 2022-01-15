import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import Post from '../entities/post.entity';

export class PostCreate {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  readonly content: Post['content'];

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  readonly title: Post['title'];

  @ApiProperty({ required: false, type: [String] })
  @IsString({ each: true })
  @IsOptional()
  readonly paragraphs: Post['paragraphs'];
}
