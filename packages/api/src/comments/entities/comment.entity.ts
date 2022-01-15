import { BaseEntity } from 'src/core';
import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column({
    nullable: false,
  })
  public content: string;

  @ManyToOne(() => Post, (post: Post) => post.comments, {
    nullable: false,
  })
  public post: Post;

  @ManyToOne(() => User, (author: User) => author.posts, {
    nullable: false,
  })
  public author: User;
}

export default Comment;
