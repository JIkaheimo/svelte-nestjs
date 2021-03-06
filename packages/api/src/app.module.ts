import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import * as path from 'path';
import { AuthenticationModule } from './authentication/modules';
import { CommentsModule } from './comments/modules/comments.module';
import {
  ConfigModule as CustomConfigModule,
  GRAPHQL_PLAYGROUND,
} from './config';
import DatabaseModule from './database';
import { PostsModule } from './posts/modules';
import { PubSubModule } from './pub-sub';
import { ReportsModule } from './reports/modules';
import { SubscribersModule } from './subscribers';
import { UsersModule } from './users/modules';
import ExceptionsLoggerFilter from './utils/exceptions.logger.filter';

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      exclude: ['/api*', '/graphql*'],
      rootPath: path.resolve(process.cwd(), '../app/public'),
    }),
    CustomConfigModule,
    PostsModule,
    UsersModule,
    CommentsModule,
    ReportsModule,
    AuthenticationModule,
    SubscribersModule,
    PubSubModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        playground: !!configService.get(GRAPHQL_PLAYGROUND),
        autoSchemaFile: path.join(process.cwd(), 'schema.gql'),
        sortSchema: true,
        installSubscriptionHandlers: true,
        formatError: (error: GraphQLError) => {
          const graphQLFormattedError: GraphQLFormattedError = {
            message:
              error.extensions?.exception?.response?.message || error.message,
          };
          return graphQLFormattedError;
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}

export default AppModule;
