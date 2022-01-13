import { Exclude } from 'class-transformer';
import { Entity, ManyToOne } from 'typeorm';

// ! Circular dependency if accessing by src/users
import { User } from 'src/users/entities';

import { File } from './file.entity';

@Entity()
export class PrivateFile extends File {
  @Exclude()
  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;
}

export default File;
