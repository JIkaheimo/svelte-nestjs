import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/UserCreateDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async create(userData: UserCreateDto) {
    const user = await this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }
}
