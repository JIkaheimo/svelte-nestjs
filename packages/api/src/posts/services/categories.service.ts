import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryService } from 'src/core';
import { Category } from '..';

export class CategoriesService extends BaseRepositoryService<Category> {
  constructor(@InjectRepository(Category) repository) {
    super(repository);
  }
}

export default CategoriesService;
