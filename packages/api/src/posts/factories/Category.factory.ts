import { define } from 'typeorm-seeding';
import Category from '../entities/category.entity';

define(Category, (faker) =>
  Category.create({
    name: `${faker.name.jobType()} ${faker.random.alphaNumeric(10)}`,
  }),
);
