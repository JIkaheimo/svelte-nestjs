import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/core';
import { User } from 'src/users/models';
import { IPost } from '../types';

@ObjectType()
export class Post extends BaseModel implements IPost {
  @Field()
  title: string;

  @Field(() => [String])
  paragraphs: string[];

  @Field(() => Int)
  authorId: number;

  @Field()
  author: User;
}
