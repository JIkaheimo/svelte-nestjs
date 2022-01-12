import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/User';
import { Entity, ManyToOne } from 'typeorm';
import { File } from './File';

@Entity()
export class PrivateFile extends File {
  @Exclude()
  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;
}

export default File;
