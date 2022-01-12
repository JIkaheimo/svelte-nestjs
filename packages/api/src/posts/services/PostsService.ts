import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In } from 'typeorm';

import { PostsSearchService } from './PostSearchService';
import { BaseRepositoryService } from 'src/base';
import { Post } from '../entities';

export class PostsService extends BaseRepositoryService<Post> {
  constructor(
    @InjectRepository(Post) repository,
    private searchService: PostsSearchService,
  ) {
    super(repository);
  }

  async create(postData: DeepPartial<Post>) {
    const newPost = await super.create(postData);
    this.searchService.indexPost(newPost);
    return newPost;
  }

  async search(text: string) {
    const results = await this.searchService.search(text);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.repository.find({
      where: { id: In(ids) },
    });
  }
}

export default PostsService;
