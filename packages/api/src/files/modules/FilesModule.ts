import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from '../entities';
import { FilesService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FilesService, ConfigService],
  exports: [FilesService],
})
export class FilesModule {}

export default FilesModule;
