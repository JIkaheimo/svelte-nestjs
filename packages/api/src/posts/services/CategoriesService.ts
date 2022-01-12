import { InjectRepository } from '@nestjs/typeorm';

import { BaseRepositoryService } from 'src/base';

import { Category } from '..';

export class CategoriesService extends BaseRepositoryService<Category> {
  constructor(@InjectRepository(Category) repository) {
    super(repository);
  }
}

export default CategoriesService;
