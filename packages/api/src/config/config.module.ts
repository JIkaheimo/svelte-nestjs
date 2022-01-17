import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  awsConfigSchema,
  graphqlConfigSchema,
  jwtConfigSchema,
  mailConfigSchema,
  pglConfigSchema,
  redisConfigSchema,
} from './schemas';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        ...awsConfigSchema,
        ...pglConfigSchema,
        ...jwtConfigSchema,
        ...redisConfigSchema,
        ...mailConfigSchema,
        ...graphqlConfigSchema,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}

export default ConfigModule;
