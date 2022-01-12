import BaseEntity from '../../base/entities/BaseEntity';
import { Column, Entity, ManyToMany } from 'typeorm';
import Post from './Post';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}

export default Category;
