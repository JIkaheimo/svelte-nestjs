require('dotenv');

module.exports = {
  type: 'mysql',
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  seeds: ['dist/**/*.seed.js'],
  synchronize: true,
  factories: ['dist/**/*.factory.js'],
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/*.migration.js'],
};
