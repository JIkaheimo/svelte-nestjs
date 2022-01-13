import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule, PrivateFilesModule } from 'src/files';

import { UsersController, UsersService, User } from '..';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), FilesModule, PrivateFilesModule],
})
export class UsersModule {}

export default UsersModule;
