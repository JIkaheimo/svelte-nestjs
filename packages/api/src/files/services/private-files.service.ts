import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseRepositoryService } from 'src/base';

import { PrivateFile } from '../entities';

import {
  IFilesService,
  createFileDeleter,
  createFileUploader,
  DeleteFile,
  UploadFile,
  createFileGetter,
  GetFile,
  createFileUrlGetter,
  GetFileUrl,
} from './private';

export class PrivateFilesService
  extends BaseRepositoryService<PrivateFile>
  implements IFilesService<PrivateFile>
{
  public bucket: string;

  constructor(
    @InjectRepository(PrivateFile) repository,
    private readonly configService: ConfigService,
  ) {
    super(repository);
    this.bucket = this.configService.get('AWS_PRIVATE_FILE_BUCKET');
  }

  getFile = createFileGetter(this) as GetFile<PrivateFile>;

  getFileUrl = createFileUrlGetter(this) as GetFileUrl<PrivateFile>;

  uploadFile = createFileUploader(this) as UploadFile<PrivateFile>;

  deleteFile = createFileDeleter(this) as DeleteFile<PrivateFile>;
}
