export const ConfigServiceMock = {
  get(key: string) {
    switch (key) {
      case 'JWT_SECRET':
        return 'testing';
      case 'JWT_EXPIRATION_TIME':
        return '3600';
    }
  },
};

export default ConfigServiceMock;
