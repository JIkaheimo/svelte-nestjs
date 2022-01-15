import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import setupApp from 'src/app';
import { entities, User } from 'src/entities';
import { ConfigServiceMock, JwtServiceMock } from 'src/utils/mocks';
import * as request from 'supertest';
import { getRepository, Repository } from 'typeorm';
import { RegistrationData } from './dtos/registration-data.dto';
import { AuthenticationModule } from './modules/authentication.module';

let app: INestApplication;
let userRepository: Repository<User>;

const userData: RegistrationData = {
  email: 'user@email.com',
  username: 'John',
  password: 'hash',
};

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      AuthenticationModule,
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities,
        logging: false,
        synchronize: true,
      }),
    ],
  })
    .overrideProvider(JwtService)
    .useValue(JwtServiceMock)
    .overrideProvider(ConfigService)
    .useValue(ConfigServiceMock)
    .compile();

  app = await setupApp(moduleFixture.createNestApplication()).init();

  userRepository = getRepository(User);
});

afterEach(async () => {
  await userRepository.clear();
});

afterAll(async () => {
  await app.close();
});

describe('when registering', () => {
  describe('and using valid data', () => {
    it('should respond with the data of the user without the password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          ...userData,
          password: 'strongPassword',
        })
        .expect('Content-Type', /json/)
        .expect(HttpStatus.CREATED);

      expect(response.body).toHaveProperty('username');
      expect(response.body).not.toHaveProperty('password');
    });
  });

  describe('and using invalid data', () => {
    it('should throw an error', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          username: userData.username,
        })
        .expect('Content-Type', /json/)
        .expect(HttpStatus.BAD_REQUEST);

      return response;
    });
  });
});
