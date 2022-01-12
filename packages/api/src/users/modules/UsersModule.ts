import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule, PrivateFilesModule } from 'src/files';

import { UsersController } from '../controllers/UsersController';
import { UsersService } from '../services/UsersService';
import { User } from '../entities/User';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), FilesModule, PrivateFilesModule],
})
export class UsersModule {}

export default UsersModule;
