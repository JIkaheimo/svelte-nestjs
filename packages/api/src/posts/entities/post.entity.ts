import BaseEntity from 'src/base/entities/base.entity';
import { User } from 'src/users/entities';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import Category from './category.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: 'text' })
  content: string;

  @ManyToOne(() => User, (author: User) => author.posts, { nullable: false })
  author: User;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];
}

export default Post;
