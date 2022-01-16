import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthenticationModule } from './authentication/modules/authentication.module';
import { CommentsModule } from './comments/modules/comments.module';
import ConfigModule from './config';
import DatabaseModule from './database';
import { PostsModule } from './posts/modules/posts.module';
import { ReportsModule } from './reports/modules/ReportsModule';
import { SubscribersModule } from './subscribers';
import { UsersModule } from './users/modules/users.module';
import ExceptionsLoggerFilter from './utils/exceptions.logger.filter';

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), '../app/public'),
    }),
    ConfigModule,
    PostsModule,
    UsersModule,
    CommentsModule,
    ReportsModule,
    AuthenticationModule,
    SubscribersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
