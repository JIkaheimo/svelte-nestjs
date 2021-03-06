import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import ElasticModule from 'src/search/elastic/elastic.module';
import { UsersModule } from 'src/users';
import { CategoriesController, PostsController } from '../controllers';
import { Post } from '../entities';
import PostsLoaders from '../loaders/posts.loaders';
import { PostsResolver } from '../resolvers';
import { PostsSearchService, PostsService } from '../services';
import CategoriesModule from './categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CategoriesModule,
    UsersModule,
    ElasticModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 120,
      }),
    }),
  ],
  providers: [PostsService, PostsSearchService, PostsResolver, PostsLoaders],
  controllers: [CategoriesController, PostsController],
  exports: [PostsService],
})
export class PostsModule {}

export default PostsModule;
