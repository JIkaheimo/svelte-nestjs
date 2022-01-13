import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let findOne: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne,
          },
        },
      ],
    }).compile();
    usersService = await module.get(UsersService);
  });
  describe('findByEmail', () => {
    describe('for an user with the given email', () => {
      let user: User;

      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });

      it('should return the user', async () => {
        const fetchedUser = await usersService.findByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('for no user with the given email', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });

      it('should return null', async () => {
        expect(await usersService.findByEmail('test@test.com')).toBeNull();
      });
    });
  });
});
