import * as Joi from 'joi';

export const GRAPHQL_PLAYGROUND = 'GRAPHQL_PLAYGROUND';

export const graphqlConfigSchema = {
  [GRAPHQL_PLAYGROUND]: Joi.number(),
};
