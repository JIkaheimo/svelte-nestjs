import { Post } from '../entities';

export interface PostSearch {
  id: Post['id'];
  title: Post['title'];
  content: Post['content'];
  authorId: Post['author']['id'];
}

export interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearch;
    }>;
  };
}
