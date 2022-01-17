import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Info,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { GraphqlJwtAuthenticationGuard } from 'src/authentication';
import { CreatePostInput } from '../inputs';
import PostsLoaders from '../loaders/posts.loaders';
import { Post } from '../models';
import { PostsService } from '../services';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private postsLoaders: PostsLoaders,
  ) {}

  @Query(() => [Post])
  async posts(@Info() info: GraphQLResolveInfo) {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(
      parsedInfo,
      info.returnType,
    );

    const posts =
      'author' in simplifiedInfo.fields
        ? await this.postsService.getPostsWithAuthors()
        : await this.postsService.getAll();

    return posts.items;
  }

  // @ResolveField('author', () => User)
  // async getAuthor(@Parent() post: Post) {
  //   const { authorId } = post;

  //   return this.postsLoaders.batchAuthors.load(authorId);
  // }

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
