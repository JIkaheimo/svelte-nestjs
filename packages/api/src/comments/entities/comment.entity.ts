import { BaseEntity } from 'src/core';
import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column({
    nullable: false,
  })
  content: string;

  @ManyToOne(() => Post, (post: Post) => post.comments, {
    nullable: false,
  })
  @JoinColumn()
  post: Post;
  @RelationId((comment: Comment) => comment.post)
  postId: Post['id'];

  @ManyToOne(() => User, (author: User) => author.posts, {
    nullable: false,
  })
  @JoinColumn()
  author: User;
  @RelationId((comment: Comment) => comment.author)
  authorId: User['id'];
}

export default Comment;
