import { PaginationParams } from 'src/core';
import { DeepPartial } from 'typeorm';
import { BaseEntity } from '../../entities';

export interface IBaseRepositoryService<Entity extends BaseEntity> {
  findById: (id: Entity['id']) => Promise<Entity>;
  findByField: (field: string, value: any) => Promise<Entity>;
  getAll: (
    params?: PaginationParams,
  ) => Promise<{ items: Entity[]; count: number }>;
  create: (data: DeepPartial<Entity>) => Promise<Entity>;
  update: (id: Entity['id'], data: DeepPartial<Entity>) => Promise<Entity>;
  delete: (id: Entity['id']) => Promise<void>;
}
