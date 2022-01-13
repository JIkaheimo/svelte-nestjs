import { PostSearch } from './post-search.type';

export interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearch;
    }>;
  };
}
