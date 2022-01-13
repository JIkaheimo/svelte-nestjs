import { Module } from '@nestjs/common';
import { UsersModule } from './users/modules/users.module';
import { ReportsModule } from './reports/modules/ReportsModule';
import { AuthenticationModule } from './authentication/modules/AuthenticationModule';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as path from 'path';
import ExceptionsLoggerFilter from './utils/exceptions.logger.filter';
import { APP_FILTER } from '@nestjs/core';
import { PostsModule } from './posts/modules/posts.module';
import DatabaseModule from './database';
import ConfigModule from './config';

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), '../app/public'),
    }),
    ConfigModule,
    PostsModule,
    UsersModule,
    ReportsModule,
    AuthenticationModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
