import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/entities';
import BaseEntity from 'src/core/entities/base.entity';
import { User } from 'src/users/entities';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { IPost } from '../types';
import Category from './category.entity';

@Entity()
export class Post extends BaseEntity implements IPost {
  @ApiProperty()
  @Column({
    nullable: false,
  })
  title: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    nullable: true,
    default: [],
  })
  paragraphs: string[];

  @ApiProperty()
  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts, {
    nullable: false,
  })
  author: User;
  @RelationId((post: Post) => post.author)
  authorId: number;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}

export default Post;
