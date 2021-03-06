import { BaseEntity } from 'src/core';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
@Index(['street', 'city', 'country'], { unique: true })
export class Address extends BaseEntity {
  @Column({
    nullable: true,
  })
  public street?: string | null;

  @Column({
    nullable: false,
  })
  public city: string;

  @Column({
    nullable: false,
  })
  public country: string;

  @OneToOne(() => User, (user: User) => user.address, {
    nullable: false,
  })
  public user: User;
}

export default Address;
