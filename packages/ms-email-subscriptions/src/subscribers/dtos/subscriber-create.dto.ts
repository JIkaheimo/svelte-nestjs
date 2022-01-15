import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriberCreate {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;
}

export default SubscriberCreate;
