import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { PostSearch, PostSearchResult, Post } from '..';

@Injectable()
export class PostsSearchService {
  index = 'posts';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    return this.elasticsearchService.index<PostSearchResult, PostSearch>({
      index: this.index,
      body: {
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.author.id,
      },
    });
  }

  async search(text: string) {
    const { body } = await this.elasticsearchService.search<PostSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'content'],
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}

export default PostsSearchService;
