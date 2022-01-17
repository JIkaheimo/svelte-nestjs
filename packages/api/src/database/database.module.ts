import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from 'src/config/schemas';
import { entities } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(POSTGRES_HOST),
        port: configService.get(POSTGRES_PORT),
        username: configService.get(POSTGRES_USER),
        password: configService.get(POSTGRES_PASSWORD),
        database: configService.get(POSTGRES_DB),
        entities,
        migrations: ['../migrations/*{.ts,.js}'],
        synchronize: true,
        dropSchema: false,
        migrationsRun: true,
        cli: {
          migrationsDir: 'migrations',
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}

export default DatabaseModule;
