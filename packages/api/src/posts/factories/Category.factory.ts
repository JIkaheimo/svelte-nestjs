import { define } from 'typeorm-seeding';
import Category from '../entities/Category';

define(Category, (faker) =>
  Category.create({
    name: `${faker.name.jobType()} ${faker.random.alphaNumeric(10)}`,
  }),
);
