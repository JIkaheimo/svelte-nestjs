import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryService, PaginationParams } from 'src/core';
import { DeepPartial, In } from 'typeorm';
import { Post } from '..';
import { PostUpdate } from '../dtos';
import { PostsSearchService } from './post-search.service';

export class PostsService extends BaseRepositoryService<Post> {
  constructor(
    @InjectRepository(Post) repository,
    private searchService: PostsSearchService,
  ) {
    super(repository);
  }

  async create(postData: DeepPartial<Post>): Promise<Post> {
    const newPost = await super.create(postData);
    await this.searchService.indexPost(newPost);
    return newPost;
  }

  async update(id: Post['id'], postData: PostUpdate) {
    const updatedPost = await super.update(id, postData);
    await this.searchService.update(updatedPost);
    return updatedPost;
  }

  async delete(id: Post['id']): Promise<void> {
    await super.delete(id);
    await this.searchService.remove(id);
  }

  async search(text: string, { offset, limit }: PaginationParams) {
    const { results } = await this.searchService.search(text, offset, limit);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.repository.find({
      where: { id: In(ids) },
    });
  }

  async findByParagraph(paragraph: string): Promise<Post[]> {
    return await this.repository.query(
      'SELECT * from post WHERE $1 = ANY(paragraphs)',
      [paragraph],
    );
  }
}

export default PostsService;
