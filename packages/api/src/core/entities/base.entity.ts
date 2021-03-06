import {
  BaseEntity as Base,
  CreateDateColumn,
  DeleteDateColumn,
  getConnection,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

export abstract class BaseEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;

  async load(relations: string | string[]): Promise<this> {
    const model = this.constructor.name;
    const connection = getConnection();
    const { relations: availableRelations } = connection.getMetadata(model);

    if (!Array.isArray(relations)) {
      relations = [relations];
    }

    for (const relation of relations) {
      const relationData = availableRelations.find(
        (o: RelationMetadata) => o.propertyName === relation,
      );

      if (!relationData) {
        throw new Error(
          `Relationship '${relation}' could not be found on relation '${model}'.`,
        );
      }

      const { relationType } = relationData;

      const queryBuilder = connection.manager
        .createQueryBuilder()
        .relation(model, relation)
        .of(this);

      if (['one-to-one', 'many-to-one'].includes(relationType)) {
        this[relation] = await queryBuilder.loadOne();
        continue;
      }

      if (['one-to-many', 'many-to-many'].includes(relationType)) {
        this[relation] = await queryBuilder.loadMany();
        continue;
      }

      throw new Error(
        `Unknown relationship type '${relationType}' on '${model}.${relation}'.`,
      );
    }

    return this;
  }
}

export default BaseEntity;
