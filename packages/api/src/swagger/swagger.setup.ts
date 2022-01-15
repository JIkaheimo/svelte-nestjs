import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import SwaggerConfig from './swagger.config';

export const createDocument = (app: INestApplication): OpenAPIObject => {
  const { title, description, version, tags } = SwaggerConfig;

  const builder = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    );

  tags.forEach((tag) => builder.addTag(tag));

  const options = builder.build();

  return SwaggerModule.createDocument(app, options);
};

export default createDocument;
