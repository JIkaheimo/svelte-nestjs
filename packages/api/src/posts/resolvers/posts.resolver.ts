import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Info,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { GraphqlJwtAuthenticationGuard } from 'src/authentication';
import { PUB_SUB } from 'src/pub-sub';
import { CreatePostInput } from '../inputs';
import { Post } from '../models';
import { PostsService } from '../services';

const POST_ADDED_EVENT = 'postAdded';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService, // private postsLoaders: PostsLoaders,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
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
    const newPost = await this.postsService.create({
      ...postData,
      author: req.user,
    });
    this.pubSub.publish(POST_ADDED_EVENT, { postAdded: newPost });
    return newPost;
  }

  @Subscription(() => Post, {
    filter: function (this: PostsResolver, payload, variables) {
      return true; //payload.postAdded.title === 'Hello world!';
    },
    resolve: function (this: PostsResolver, value) {
      return {
        ...value.postAdded,
        title: `Title: ${value.postAdded.title}`,
      };
    },
  })
  postAdded() {
    return this.pubSub.asyncIterator(POST_ADDED_EVENT);
  }
}
