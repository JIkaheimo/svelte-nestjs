import * as Joi from 'joi';

export const JWT_ACCESS_TOKEN_SECRET = 'JWT_ACCESS_TOKEN_SECRET';
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME =
  'JWT_ACCESS_TOKEN_EXPIRATION_TIME';
export const JWT_REFRESH_TOKEN_SECRET = 'JWT_REFRESH_TOKEN_SECRET';
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME =
  'JWT_REFRESH_TOKEN_EXPIRATION_TIME';

export const jwtConfigSchema = {
  [JWT_ACCESS_TOKEN_SECRET]: Joi.string().required(),
  [JWT_ACCESS_TOKEN_EXPIRATION_TIME]: Joi.string().required(),
  [JWT_REFRESH_TOKEN_SECRET]: Joi.string().required(),
  [JWT_REFRESH_TOKEN_EXPIRATION_TIME]: Joi.string().required(),
};
