import { Factory, Seeder } from 'typeorm-seeding';
import Category from '../entities/category.entity';

export default class CategorySeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Category)().createMany(10);
  }
}
