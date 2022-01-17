import { BaseEntity } from 'src/core';
import { User } from 'src/users';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @Column({ nullable: false })
  public content: string;

  @ManyToOne(() => User, { nullable: false })
  public author: User;
}

export default Message;
