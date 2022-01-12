import { NotFoundException } from '@nestjs/common';
import { BaseEntity, EntityTarget, getRepository } from 'typeorm';

export class EntityNotFound<T extends BaseEntity> extends NotFoundException {
  constructor(entity: EntityTarget<T>) {
    const { tableName } = getRepository(entity).metadata;
    super(`${tableName} with the given id does not exist.`);
  }
}
