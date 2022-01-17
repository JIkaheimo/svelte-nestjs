import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthenticationGuard } from 'src/authentication';
import { CreatePostInput } from '../inputs';
import { Post } from '../models';
import { PostsService } from '../services';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post])
  async posts() {
    const posts = await this.postsService.getAll();
    return posts.items;
  }

  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthenticationGuard)
  async createPost(
    @Args('input') postData: CreatePostInput,
    @Context() { req },
  ) {
    return await this.postsService.create({
      ...postData,
      author: req.user,
    });
  }
}
