import { SubscriberCreate } from '@jikaheimo/ms-email-subscriptions';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/authentication';

@ApiTags('subscribers')
@Controller('subscribers')
@UseGuards(JwtAuthenticationGuard)
export class SubscribersController {
  constructor(
    @Inject('SUBSCRIBERS_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async getSubscribers() {
    return this.client.send(
      {
        cmd: 'get-all-subscribers',
      },
      '',
    );
  }

  @Post()
  async createPost(@Body() subscriber: SubscriberCreate) {
    console.log(subscriber);
    return this.client.send(
      {
        cmd: 'add-subscriber',
      },
      subscriber,
    );
  }
}

export default SubscribersController;
