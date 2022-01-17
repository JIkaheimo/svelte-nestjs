import * as Joi from 'joi';

export const EMAIL_SERVICE = 'EMAIL_SERVICE';
export const EMAIL_USER = 'EMAIL_USER';
export const EMAIL_PASSWORD = 'EMAIL_PASSWORD';

export const mailConfigSchema = {
  [EMAIL_SERVICE]: Joi.string().required(),
  [EMAIL_USER]: Joi.string().required(),
  [EMAIL_PASSWORD]: Joi.string().required(),
};
