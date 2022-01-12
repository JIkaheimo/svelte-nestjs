import { Module } from '@nestjs/common';
import PostsService from '../services/PostsService';
import PostsController from '../controllers/PostsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from '../entities/Post';
import CategoriesController from '../controllers/CategoriesController';
import CategoriesModule from './CategoriesModule';
import ElasticModule from 'src/search/elastic/elastic.module';
import { PostsSearchService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoriesModule, ElasticModule],
  providers: [PostsService, PostsSearchService],
  controllers: [CategoriesController, PostsController],
  exports: [PostsService],
})
export class PostsModule {}
