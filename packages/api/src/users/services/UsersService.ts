import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilesService, File, PrivateFilesService } from 'src/files';
import { BaseRepositoryService } from 'src/base';

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
    if (fileData.owner.id !== user.id) {
      throw new UnauthorizedException();
    }
    return { file: fileData, stream };
  }

  async getAllPrivateFiles(userId: User['id']) {
    const user = await this.findById(userId);
    await user.load('files');
    return await Promise.all(
      user.files.map(
        async (file) => await this.privateFilesService.getFileUrl(file.id),
      ),
    );
  }

  async addAvatar(user: User, avatarFile: Express.Multer.File) {
    const avatar = await this.filesService.uploadFile(avatarFile);
    user.avatar = avatar;
    await user.save();
    return avatar;
  }
}

export default UsersService;
