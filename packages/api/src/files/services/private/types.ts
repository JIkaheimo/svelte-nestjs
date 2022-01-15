import { IBaseRepositoryService } from 'src/core/services/private';
import { File } from 'src/files/entities';
import { Readable } from 'stream';
import { EntityManager } from 'typeorm';

export interface GetFileResult<FileLike extends File> {
  stream: Readable;
  file: FileLike;
}

export type GetFile<FileLike extends File> = (
  fileId: FileLike['id'],
) => Promise<GetFileResult<FileLike>>;

export type GetFileUrl<FileLike extends File> = (
  fileId: FileLike['id'],
) => Promise<string>;

export type UploadFile<FileLike extends File> = (
  file: Express.Multer.File,
) => Promise<FileLike>;

export type DeleteFile<FileLike extends File> = (
  fileId: FileLike['id'],
) => Promise<void>;

export type DeleteFileTransaction<FileLike extends File> = (
  fileId: FileLike['id'],
  entityManager: EntityManager,
) => Promise<void>;

export interface IFilesService<FileLike extends File>
  extends IBaseRepositoryService<FileLike> {
  bucket: string;

  getFile: GetFile<FileLike>;
  getFileUrl: GetFileUrl<FileLike>;
  uploadFile: UploadFile<FileLike>;
  deleteFile: DeleteFile<FileLike>;
  deleteFileTransaction: DeleteFileTransaction<FileLike>;
}

export default IFilesService;
