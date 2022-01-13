import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from 'src/base';

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
