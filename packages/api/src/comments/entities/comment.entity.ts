import { BaseEntity } from 'src/core';
import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column({
    nullable: false,
  })
  public content: string;

  @Column({ nullable: false })
  postId: Post['id'];

  @ManyToOne(() => Post, (post: Post) => post.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'postId' })
  public post: Post;

  @Column({ nullable: false })
  authorId: User['id'];

  @ManyToOne(() => User, (author: User) => author.posts, {
    nullable: false,
  })
  @JoinColumn({ name: 'authorId' })
  public author: User;
}

export default Comment;
