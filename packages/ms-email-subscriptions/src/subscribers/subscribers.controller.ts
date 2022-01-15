import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import SubscriberCreate from './dtos/subscriber-create.dto';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @MessagePattern({ cmd: 'add-subscriber' })
  addSubscriber(subscriber: SubscriberCreate) {
    return this.subscribersService.addSubscriber(subscriber);
  }

  @MessagePattern({ cmd: 'get-all-subscribers' })
  getAllSubscribers() {
    console.log('Getting subscribers');
    return this.subscribersService.getAllSubscribers();
  }
}
