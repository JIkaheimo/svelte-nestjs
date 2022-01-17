import * as Joi from 'joi';

export const REDIS_HOST = 'REDIS_HOST';
export const REDIS_PORT = 'REDIS_PORT';

export const redisConfigSchema = {
  [REDIS_HOST]: Joi.string().required(),
  [REDIS_PORT]: Joi.number().required(),
};

export default redisConfigSchema;
