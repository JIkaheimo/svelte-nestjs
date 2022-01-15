import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from 'src/aws/s3/client';
import { Readable } from 'stream';
import { DeepPartial, EntityManager, EntityTarget } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { GetFileResult } from '.';
import { File } from '../../entities';
import { IFilesService } from './types';

export const createFileGetter =
  <FileLike extends File>(service: IFilesService<FileLike>) =>
  async (fileId: FileLike['id']): Promise<GetFileResult<FileLike>> => {
    // Get the file data from database.
    const fileData = await service.findById(fileId);

    // Get the actual file from S3.
    const output = await s3Client.getObject({
      Bucket: service.bucket,
      Key: fileData.key,
    });

    return {
      stream: output.Body as Readable,
      file: fileData,
    };
  };

export const createFileUrlGetter =
  <FileLike extends File>(service: IFilesService<FileLike>) =>
  async (fileId: FileLike['id']): Promise<string> => {
    // Get the file data from database.
    const fileData = await service.findById(fileId);

    return await getSignedUrl(
      s3Client,
      new GetObjectCommand({ Bucket: service.bucket, Key: fileData.key }),
    );
  };

export const createFileUploader =
  <FileLike extends File>(service: IFilesService<FileLike>) =>
  async (file: Express.Multer.File): Promise<FileLike> => {
    const key = `${uuid()}_${file.originalname}`;

    // Upload the file to S3.
    await s3Client.putObject({
      Bucket: service.bucket,
      Key: key,
      Body: file.buffer,
    });

    // Add the file to database.
    return await service.create({
      key,
      mimetype: file.mimetype,
      name: file.originalname,
    } as DeepPartial<FileLike>);
  };

export const createFileRemover =
  <FileLike extends File>(service: IFilesService<FileLike>) =>
  async (fileId: FileLike['id']) => {
    const file = await service.findById(fileId);

    // Delete the file from S3.
    await s3Client.deleteObject({
      Bucket: service.bucket,
      Key: file.key,
    });

    // Delete the file from database.
    await service.delete(fileId);
  };

export const createFileRemoverTransaction =
  <FileLike extends File>(
    service: IFilesService<FileLike>,
    entity: EntityTarget<FileLike>,
  ) =>
  async (fileId: FileLike['id'], entityManager: EntityManager) => {
    const file = await entityManager.findOne(entity, fileId);

    // Delete the file from S3.
    await s3Client.deleteObject({
      Bucket: service.bucket,
      Key: file.key,
    });

    // Delete the file from database.
    await entityManager.delete(entity, fileId);
    return;
  };
