import { PostSearch } from './PostSearch';

export interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearch;
    }>;
  };
}