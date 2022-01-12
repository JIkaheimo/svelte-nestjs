import { Exclude } from 'class-transformer';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/base';
import { Post } from 'src/posts';
import { PrivateFile, File } from 'src/files';

import Address from './Address';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @OneToOne(() => Address, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  address?: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];

  @OneToOne(() => File, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  public avatar?: File;

  @Exclude()
  @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
  public files: PrivateFile[];
}

export default User;
