import { Post } from 'src/posts';

export class GetCommentsQuery {
  constructor(public readonly postId?: Post['id']) {}
}

export default GetCommentsQuery;
