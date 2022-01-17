import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AWS_PRIVATE_FILE_BUCKET } from 'src/config/schemas';
import { BaseRepositoryService } from 'src/core';
import { PrivateFile } from '../entities';
import {
  createFileGetter,
  createFileRemover,
  createFileRemoverTransaction,
  createFileUploader,
  createFileUrlGetter,
  DeleteFile,
  DeleteFileTransaction,
  GetFile,
  GetFileUrl,
  IFilesService,
  UploadFile,
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
    this.bucket = this.configService.get(AWS_PRIVATE_FILE_BUCKET);
  }

  getFile = createFileGetter(this) as GetFile<PrivateFile>;

  getFileUrl = createFileUrlGetter(this) as GetFileUrl<PrivateFile>;

  uploadFile = createFileUploader(this) as UploadFile<PrivateFile>;

  deleteFile = createFileRemover(this) as DeleteFile<PrivateFile>;

  deleteFileTransaction: DeleteFileTransaction<PrivateFile> =
    createFileRemoverTransaction(this, PrivateFile);
}
