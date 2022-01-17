import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Post, PostSearch, PostSearchResult } from '..';

const index = 'posts';

@Injectable()
export class PostsSearchService {
  constructor(private readonly searchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    await this.searchService.index<PostSearchResult, PostSearch>({
      index,
      body: {
        id: post.id,
        title: post.title,
        paragraphs: post.paragraphs,
        authorId: post.author.id,
      },
    });
    return;
  }

  async search(text: string, offset?: number, limit?: number, startId = 0) {
    let separateCount = 0;
    if (startId) {
      separateCount = await this.count(text, ['title', 'paragraphs']);
    }
    const { body } = await this.searchService.search<PostSearchResult>({
      index,
      from: offset,
      size: limit,
      body: {
        query: {
          bool: {
            should: {
              multi_match: {
                query: text,
                fields: ['title', 'paragraphs'],
              },
            },
            filter: {
              range: {
                id: {
                  gt: startId,
                },
              },
            },
          },
        },
        sort: {
          id: {
            order: 'asc',
          },
        },
      },
    });

    return {
      count: startId ? separateCount : body.hits.total,
      results: body.hits.hits.map((item) => item._source),
    };
  }

  async count(query: string, fields: string[]) {
    const { body } = await this.searchService.count({
      index,
      body: {
        query: {
          multi_match: {
            query,
            fields,
          },
        },
      },
    });
    return body.count;
  }

  async update(post: Post) {
    await post.load('author');
    const script = Object.entries({
      id: post.id,
      title: post.title,
      authorId: post.author.id,
      paragraphs: post.paragraphs,
    }).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.searchService.updateByQuery({
      index: index,
      body: {
        query: {
          match: {
            id: post.id,
          },
        },
        script: {
          inline: script,
        },
      },
    });
  }

  async remove(postId: Post['id']): Promise<void> {
    await this.searchService.deleteByQuery({
      index,
      body: {
        query: {
          match: {
            id: postId,
          },
        },
      },
    });
    return;
  }
}

export default PostsSearchService;
