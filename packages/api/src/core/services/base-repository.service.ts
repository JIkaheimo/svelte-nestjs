import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  MoreThan,
  Repository,
} from 'typeorm';
import { PaginationParams } from '..';
import { BaseEntity } from '../entities';
import { EntityNotFound } from '../repository.exceptions';
import { IBaseRepositoryService } from './private';

export abstract class BaseRepositoryService<Entity extends BaseEntity>
  implements IBaseRepositoryService<Entity>
{
  constructor(protected readonly repository: Repository<Entity>) {}

  /**
   * Returns all the entities.
   */
  async getAll(
    { offset, limit, startId }: PaginationParams = {
      offset: null,
      limit: null,
      startId: null,
    },
  ) {
    const where: FindManyOptions<Entity>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.repository.count();
    }
    const options: FindManyOptions = {
      where,
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    };

    const [items, count] = await this.repository.findAndCount(options);
    return { items, count: startId ? separateCount : count };
  }

  /**
   * Returns the entity with the given id.
   * @throws {EntityNotFound}
   */
  async findById(id: Entity['id'], options?: FindOneOptions<Entity>) {
    const entity = await this.repository.findOne(id, options);
    if (!entity) throw new EntityNotFound(this.repository);
    return entity;
  }

  /**
   * Returns the entity with the given field-value pair.
   * @throws {EntityNotFound}
   */
  async findByField(field: string, value: any) {
    const entity = await this.repository.findOne({ [field]: value });
    if (!entity) throw new EntityNotFound(this.repository);
    return entity;
  }

  /**
   * Creates a new entity with given input data.
   */
  async create(data: DeepPartial<Entity>) {
    const newEntity = await this.repository.create(data);
    await newEntity.save();
    return newEntity;
  }

  /**
   * Updates the entity with the given id with given input data.
   */
  async update(id: Entity['id'], data: DeepPartial<Entity>) {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  /**
   * Deletes the entity with the given id.
   */
  async delete(id: Entity['id']) {
    const deleteResponse = await this.repository.delete(id);
    if (!deleteResponse.affected) {
      throw new EntityNotFound(this.repository);
    }
  }
}

export default BaseRepositoryService;
