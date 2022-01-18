import { Exclude } from 'class-transformer';
import { Role } from 'src/authentication/enums';
import { BaseEntity } from 'src/core';
import { File, PrivateFile } from 'src/files';
import { Post } from 'src/posts';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { IUser } from '../types';
import Address from './address.entity';

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  @Exclude()
  password: string;

  @OneToOne(() => Address, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  @Exclude()
  address?: Address | null;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];

  @OneToOne(() => File, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  avatar?: File | null;

  @Exclude()
  @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
  files: PrivateFile[];

  @Column({
    nullable: true,
  })
  @Exclude()
  refreshToken?: string | null;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
}

export default User;
