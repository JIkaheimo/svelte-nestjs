import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostCreate, PostUpdate } from './posts.dtos';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() post: PostCreate) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() post: PostUpdate) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    this.postsService.deletePost(id);
  }
}
