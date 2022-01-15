import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryService } from 'src/core';
import { File } from '../entities';
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

  getFile: GetFile<File> = createFileGetter(this);

  getFileUrl: GetFileUrl<File> = createFileUrlGetter(this);

  uploadFile: UploadFile<File> = createFileUploader(this);

  deleteFile: DeleteFile<File> = createFileRemover(this);

  deleteFileTransaction: DeleteFileTransaction<File> =
    createFileRemoverTransaction(this, File);
}
