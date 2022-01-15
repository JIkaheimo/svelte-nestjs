import { Column, Entity, ManyToMany } from 'typeorm';
import BaseEntity from '../../core/entities/base.entity';
import Post from './post.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}

export default Category;
