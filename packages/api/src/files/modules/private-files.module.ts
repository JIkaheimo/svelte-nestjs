import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// ! Circular dependency if accessing by ..
import { PrivateFile } from '../entities';
import { PrivateFilesService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateFile])],
  providers: [PrivateFilesService, ConfigService],
  exports: [PrivateFilesService],
})
export class PrivateFilesModule {}

export default PrivateFilesModule;
