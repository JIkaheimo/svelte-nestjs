import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @Exclude()
  @Column({ nullable: false })
  public key: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public mimetype: string;
}
