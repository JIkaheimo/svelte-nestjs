import { BaseEntity, DeepPartial, Repository } from 'typeorm';
import { EntityNotFound } from '../repository.exceptions';

export interface IBaseRepositoryService<Entity extends BaseEntity> {
  findById: (id: string) => Promise<Entity>;
  findByField: (field: string, value: any) => Promise<Entity>;
  getAll: () => Promise<Entity[]>;
  create: (data: DeepPartial<Entity>) => Promise<Entity>;
  update: (id: string, data: DeepPartial<Entity>) => Promise<Entity>;
  delete: (id: string) => Promise<void>;
}

export abstract class BaseRepositoryService<Entity extends BaseEntity>
  implements IBaseRepositoryService<Entity>
{
  constructor(protected readonly repository: Repository<Entity>) {}

  /**
   * Returns all the entities.
   */
  async getAll(): Promise<Entity[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Entity> {
    const entity = await this.repository.findOne(id);
    if (!entity) throw new EntityNotFound(this.repository);
    return entity;
  }

  async findByField(field: string, value: any): Promise<Entity> {
    const entity = await this.repository.findOne({ [field]: value });
    if (!entity) throw new EntityNotFound(this.repository);
    return entity;
  }

  async create(data: DeepPartial<Entity>): Promise<Entity> {
    const newEntity = await this.repository.create(data);
    await newEntity.save();
    return newEntity;
  }

  async update(id: string, data: DeepPartial<Entity>): Promise<Entity> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const deleteResponse = await this.repository.delete(id);
    if (!deleteResponse.affected) {
      throw new EntityNotFound(this.repository);
    }
  }
}

export default BaseRepositoryService;
