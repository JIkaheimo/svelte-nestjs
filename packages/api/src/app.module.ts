import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users';
import { AuthenticationModule } from './authentication/authentication.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PostsModule } from './posts/posts.module';
import * as path from 'path';
import * as Joi from 'joi';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'mycv',
      entities: [User],
      synchronize: true,
      username: 'root',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), '../app/public'),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    UsersModule,
    ReportsModule,
    AuthenticationModule,
    PostsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
