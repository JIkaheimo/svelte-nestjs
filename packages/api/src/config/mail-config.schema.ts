import * as Joi from 'joi';

export const mailConfigSchema = {
  EMAIL_SERVICE: Joi.string().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
};
