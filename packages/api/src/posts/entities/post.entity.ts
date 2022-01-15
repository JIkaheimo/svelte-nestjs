import BaseEntity from 'src/core/entities/base.entity';
import { User } from 'src/users/entities';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import Category from './category.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({
    nullable: false,
  })
  title: string;

  @Column('text', {
    nullable: false,
  })
  content: string;

  @Column('text', {
    array: true,
    nullable: true,
    default: [],
  })
  paragraphs?: string[];

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts, {
    nullable: false,
  })
  author: User;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];
}

export default Post;
