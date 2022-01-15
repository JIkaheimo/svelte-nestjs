import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SubscriberCreate from './dtos/subscriber-create.dto';
import Subscriber from './subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private repository: Repository<Subscriber>,
  ) {}

  async addSubscriber(subscriber: SubscriberCreate) {
    const newSubscriber = await this.repository.create(subscriber);
    await this.repository.save(newSubscriber);
    return newSubscriber;
  }

  async getAllSubscribers() {
    return this.repository.find();
  }
}
