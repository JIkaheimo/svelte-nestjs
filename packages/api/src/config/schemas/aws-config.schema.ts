import * as Joi from 'joi';

export const AWS_REGION = 'AWS_REGION';
export const AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID';
export const AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY';
export const AWS_FILE_BUCKET = 'AWS_FILE_BUCKET';
export const AWS_PRIVATE_FILE_BUCKET = 'AWS_PRIVATE_FILE_BUCKET';

export const awsConfigSchema = {
  [AWS_REGION]: Joi.string().required(),
  [AWS_ACCESS_KEY_ID]: Joi.string().required(),
  [AWS_SECRET_ACCESS_KEY]: Joi.string().required(),
  [AWS_FILE_BUCKET]: Joi.string().required(),
  [AWS_PRIVATE_FILE_BUCKET]: Joi.string().required(),
};
