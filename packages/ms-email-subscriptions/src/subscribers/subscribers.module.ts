import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Subscriber from './subscriber.entity';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  providers: [SubscribersService],
  controllers: [SubscribersController],
  exports: [SubscribersService],
})
export class SubscribersModule {}

export default SubscribersModule;
