import { AuthenticationService } from './AuthenticationService';
import { User, UsersService } from 'src/users';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mocks } from 'src/utils';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockResponse = () => {
  const res = {} as Response;
  res.cookie = jest.fn();
  res.clearCookie = jest.fn();
  return res;
};

const createModule = async ({ findOne }) =>
  await Test.createTestingModule({
    providers: [
      UsersService,
      AuthenticationService,
      {
        provide: ConfigService,
        useValue: mocks.ConfigServiceMock,
      },
      {
        provide: JwtService,
        useValue: mocks.JwtServiceMock,
      },
      {
        provide: getRepositoryToken(User),
        useValue: {
          findOne,
        },
      },
    ],
  }).compile();

describe('AuthenticationService', () => {
  let bcryptCompare: jest.Mock;
  let userData;
  let authenticationService: AuthenticationService;
  let findOne: jest.Mock;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    userData = {
      id: 'UserID-12345',
      email: 'user@email.com',
      username: 'John',
      password: 'hash',
    };

    findOne = jest.fn().mockResolvedValue(userData);

    const module = await createModule({ findOne });

    authenticationService = await module.get(AuthenticationService);
  });

  describe('while authenticating an user', () => {
    it('should set the authentication header', async () => {
      const response = mockResponse();
      await authenticationService.authenticateUser(response, 'UserID-12345');
      expect(response.cookie).toBeCalledWith(
        'Authentication',
        expect.any(String),
      );
    });
  });

  describe('when accessing the data of authenticating user', () => {
    describe('and the provided password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(false);
      });
      it('should throw an error', async () => {
        await expect(
          authenticationService.getAuthenticatedUser(
            'user@email.com',
            'strongPassword',
          ),
        ).rejects.toThrow();
      });
    });
    describe('and the provided password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(true);
      });
      describe('and the user is found in the database', () => {
        beforeEach(() => {
          findOne.mockResolvedValue(userData);
        });
        it('should return the user data', async () => {
          const user = await authenticationService.getAuthenticatedUser(
            'user@email.com',
            'strongPassword',
          );
          expect(user).toBe(userData);
        });
      });
      describe('and the user is not found in the database', () => {
        beforeEach(() => {
          findOne.mockResolvedValue(undefined);
        });
        it('should throw an error', async () => {
          await expect(
            authenticationService.getAuthenticatedUser(
              'user@email.com',
              'strongPassword',
            ),
          ).rejects.toThrow();
        });
      });
    });
  });
});
