import { Exclude } from 'class-transformer';
// ! Circular dependency if accessing by src/users
import { User } from 'src/users/entities';
import { Entity, ManyToOne } from 'typeorm';
import { File } from './file.entity';

@Entity()
export class PrivateFile extends File {
  @Exclude()
  @ManyToOne(() => User, (owner: User) => owner.files, { nullable: false })
  public owner: User;
}

export default File;
