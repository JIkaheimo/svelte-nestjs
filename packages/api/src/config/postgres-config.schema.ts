import * as Joi from 'joi';

export const POSTGRES_HOST = 'POSTGRES_HOST';
export const POSTGRES_PORT = 'POSTGRES_PORT';
export const POSTGRES_USER = 'POSTGRES_USER';
export const POSTGRES_PASSWORD = 'POSTGRES_PASSWORD';
export const POSTGRES_DB = 'POSTGRES_DB';

export const pglConfigSchema = {
  [POSTGRES_HOST]: Joi.string().required(),
  [POSTGRES_PORT]: Joi.number().required(),
  [POSTGRES_USER]: Joi.string().required(),
  [POSTGRES_PASSWORD]: Joi.string().required(),
  [POSTGRES_DB]:
    process.env.NODE_ENV === 'production'
      ? Joi.string()
      : Joi.string().allow(''),
};
