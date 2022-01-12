import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ElasticModule from 'src/search/elastic/elastic.module';

import { Post } from '../entities';
import { CategoriesController, PostsController } from '../controllers';
import CategoriesModule from './CategoriesModule';
import { PostsSearchService, PostsService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoriesModule, ElasticModule],
  providers: [PostsService, PostsSearchService],
  controllers: [CategoriesController, PostsController],
  exports: [PostsService],
})
export class PostsModule {}
