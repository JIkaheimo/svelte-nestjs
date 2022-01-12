import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryService } from 'src/base';
import { Category } from '../entities';

export class CategoriesService extends BaseRepositoryService<Category> {
  constructor(@InjectRepository(Category) repository) {
    super(repository);
  }
}

export default CategoriesService;
