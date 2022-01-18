import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IBaseEntity } from '../types';

@ObjectType()
export class BaseModel implements IBaseEntity {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date | null;
}
