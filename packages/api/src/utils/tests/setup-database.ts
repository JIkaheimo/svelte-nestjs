// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppModule } from 'src/app.module';

import { entities } from 'src/entities';
import { createConnection } from 'typeorm';

export const setupDatabase = async () =>
  await createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities,
    logging: false,
    synchronize: true,
  });
