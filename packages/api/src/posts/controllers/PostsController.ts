import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  JwtAuthenticationGuard,
  AuthenticatedRequest,
} from 'src/authentication';
import { PostCreate, PostUpdate } from '../dtos';
import { PostsService } from '../services';

@Controller('/posts')
@UseGuards(JwtAuthenticationGuard)
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ description: 'Get all posts.' })
  getPosts() {
    return this.postsService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ description: 'Get a post with the given id.' })
  getPost(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Post()
  createPost(@Body() post: PostCreate, @Req() req: AuthenticatedRequest) {
    return this.postsService.create({ ...post, author: req.user });
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() post: PostUpdate) {
    return this.postsService.update(id, post);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}

export default PostsController;
