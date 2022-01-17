import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedRequest,
  JwtAuthenticationGuard,
} from 'src/authentication';
import { PaginationParams } from 'src/core';
import { PostCreate, PostUpdate } from '../dtos';
import { PostsService } from '../services';

@ApiTags('posts')
@Controller('posts')
@UseGuards(JwtAuthenticationGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ description: 'Get all posts.' })
  @Get()
  @UseInterceptors(CacheInterceptor)
  getPosts(
    @Query('search') search: string,
    @Query() pagination: PaginationParams,
  ) {
    if (search) {
      return this.postsService.search(search, pagination);
    }
    return this.postsService.getAll(pagination);
  }

  @ApiOperation({ description: 'Get post by id.' })
  @Get(':id')
  @ApiOperation({ description: 'Get a post with the given id.' })
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findById(id, { relations: ['author'] });
  }

  @ApiOperation({ description: 'Create a new post' })
  @Post()
  createPost(@Body() post: PostCreate, @Req() req: AuthenticatedRequest) {
    return this.postsService.create({ ...post, author: req.user });
  }

  @Put(':id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() post: PostUpdate) {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}

export default PostsController;
