import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryService } from 'src/base';
import { File } from '../entities';

import {
  createFileDeleter,
  createFileGetter,
  createFileUploader,
  createFileUrlGetter,
  DeleteFile,
  GetFile,
  GetFileUrl,
  IFilesService,
  UploadFile,
} from './private';

export class FilesService
  extends BaseRepositoryService<File>
  implements IFilesService<File>
{
  public bucket: string;

  constructor(
    @InjectRepository(File) repository,
    private readonly configService: ConfigService,
  ) {
    super(repository);
    this.bucket = this.configService.get('AWS_FILE_BUCKET');
  }

  getFile = createFileGetter(this) as GetFile<File>;

  getFileUrl = createFileUrlGetter(this) as GetFileUrl<File>;

  uploadFile = createFileUploader(this) as UploadFile<File>;

  deleteFile = createFileDeleter(this) as DeleteFile<File>;
}
