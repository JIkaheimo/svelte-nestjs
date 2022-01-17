import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
} from 'src/config';

export const ConfigServiceMock = {
  get(key: string) {
    switch (key) {
      case JWT_ACCESS_TOKEN_SECRET:
        return 'testing';
      case JWT_ACCESS_TOKEN_EXPIRATION_TIME:
        return '3600';
    }
  },
};

export default ConfigServiceMock;
