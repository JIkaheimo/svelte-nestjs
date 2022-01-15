import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from '..';

@Controller('posts/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findById(id);
  }
}

export default CategoriesController;
