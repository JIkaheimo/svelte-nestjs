import BaseEntity from '../../base/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import Post from './post.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}

export default Category;
