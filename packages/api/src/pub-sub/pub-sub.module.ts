import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { REDIS_HOST, REDIS_PORT } from 'src/config';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: (configService: ConfigService) =>
        new RedisPubSub({
          connection: {
            host: configService.get(REDIS_HOST),
            port: configService.get(REDIS_PORT),
          },
        }),
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}

export default PubSubModule;
