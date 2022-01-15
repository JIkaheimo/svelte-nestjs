import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id?: number;

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
}

export default Subscriber;
