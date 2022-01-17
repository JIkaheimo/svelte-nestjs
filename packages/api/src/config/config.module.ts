import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { awsConfigSchema } from './aws-config.schema';
import { jwtConfigSchema } from './jwt-config.schema';
import { mailConfigSchema } from './mail-config.schema';
import { pglConfigSchema } from './postgres-config.schema';
import { redisConfigSchema } from './redis-config.schema';

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
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}

export default ConfigModule;
