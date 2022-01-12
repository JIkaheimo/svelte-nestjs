import Category from '../entities/Category';

import { Factory, Seeder } from 'typeorm-seeding';

export default class CategorySeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Category)().createMany(10);
  }
}
