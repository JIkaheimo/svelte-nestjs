import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { BaseRepositoryService } from 'src/core';
import { File, FilesService, PrivateFilesService } from 'src/files';
import { getConnection } from 'typeorm';
import { User } from '../entities';

export class UsersService extends BaseRepositoryService<User> {
  constructor(
    @InjectRepository(User) repository,
    private readonly filesService: FilesService,
    private readonly privateFilesService: PrivateFilesService,
  ) {
    super(repository);
  }

  /**
   * Returns the user with the given email.
   */
  async findByEmail(email: User['email']): Promise<User> {
    return (await this.repository.findOne({ email })) ?? null;
  }

  async addPrivateFile(user: User, file: Express.Multer.File) {
    const privateFile = await this.privateFilesService.uploadFile(file);
    privateFile.owner = user;
    await privateFile.save();
    return privateFile;
  }

  async getPrivateFile(user: User, fileId: File['id']) {
    const { stream, file: fileData } = await this.privateFilesService.getFile(
      fileId,
    );
    await fileData.load('owner');
    // TODO: Move authorization to middleware or something.
    if (fileData.owner.id !== user.id) {
      throw new UnauthorizedException();
    }
    return { file: fileData, stream };
  }

  /**
   * Returns all the private file urls of the user with the given id.
   */
  async getAllPrivateFiles(userId: User['id']) {
    const user = await this.findById(userId);
    await user.load('files');
    return await Promise.all(
      user.files.map(
        async ({ id }) => await this.privateFilesService.getFileUrl(id),
      ),
    );
  }

  /**
   * Updates the avatar of the user.
   */
  async addAvatar(user: User, avatarFile: Express.Multer.File) {
    // TODO: Remove the old avatar before adding the new one.
    const avatar = await this.filesService.uploadFile(avatarFile);
    user.avatar = avatar;
    await user.save();
    return avatar;
  }

  /**
   * Deletes the avatar of the user with the given id.
   */
  async deleteAvatar(userId: User['id']) {
    const user = await this.findById(userId);
    const fileId = user.avatar?.id;

    if (!fileId) return;

    await getConnection().transaction(async (entityManager) => {
      await entityManager.update(User, userId, {
        avatar: null,
      });
      await this.filesService.deleteFileTransaction(fileId, entityManager);
    });
  }

  async setCurrentRefreshToken(rawToken: string, userId: User['id']) {
    const refreshToken = await bcrypt.hash(rawToken, 10);
    await this.update(userId, {
      refreshToken,
    });
  }

  async removeRefreshToken(userId: User['id']) {
    return this.update(userId, {
      refreshToken: null,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: User['id']) {
    const user = await this.findById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}

export default UsersService;
