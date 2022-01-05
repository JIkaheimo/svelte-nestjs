import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '.';
import { PostCreate, PostUpdate } from './posts.dtos';

@Injectable()
export class PostsService {
  private lastPostId = 1;
  private posts: { [postId: number]: Post } = {
    1: {
      id: 1,
      content: 'Placeholder content...',
      title: 'Title',
    },
  };

  /**
   * Returns all posts.
   */
  getPosts(): Post[] {
    return Object.values(this.posts);
  }

  /**
   * Returns the post with the given id.
   *
   * @throws {NotFoundException}
   */
  getPost(id: number): Post {
    const post = this.posts[id];
    if (post) {
      return post;
    }
    throw new NotFoundException();
  }

  /**
   * Updates the post with the given id.
   *
   * @throws {NotFoundException}
   */
  updatePost(id: number, post: PostUpdate): Post {
    if (this.posts[id]) {
      this.posts[id] = { id, ...post };
      return this.posts[id];
    }
    throw new NotFoundException();
  }

  /**
   * Creates a new post
   * @param post
   * @returns
   */
  createPost(post: PostCreate): Post {
    const id = ++this.lastPostId;
    const newPost = { ...post, id };
    this.posts[id] = newPost;
    return newPost;
  }

  deletePost(id: number): void {
    if (this.posts[id]) {
      delete this.posts[id];
    } else {
      throw new NotFoundException();
    }
  }
}
