import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ElasticModule from 'src/search/elastic/elastic.module';
import { CategoriesController, PostsController } from '../controllers';
import { Post } from '../entities';
import { PostsSearchService, PostsService } from '../services';
import CategoriesModule from './categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoriesModule, ElasticModule],
  providers: [PostsService, PostsSearchService],
  controllers: [CategoriesController, PostsController],
  exports: [PostsService],
})
export class PostsModule {}

export default PostsModule;
