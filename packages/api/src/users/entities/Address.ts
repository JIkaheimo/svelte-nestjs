import { BaseEntity } from 'src/base';
import { Column, Entity, Index, OneToOne } from 'typeorm';

import { User } from './User';

@Entity()
@Index(['street', 'city', 'country'], { unique: true })
export class Address extends BaseEntity {
  @Column({ nullable: true })
  public street?: string;

  @Column({ nullable: false })
  public city: string;

  @Column({ nullable: false })
  public country: string;

  @OneToOne(() => User, (user: User) => user.address)
  public user: User;
}

export default Address;
