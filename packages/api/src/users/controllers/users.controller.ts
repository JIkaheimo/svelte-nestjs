import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/authentication';
import { JwtAuthenticationGuard } from 'src/authentication/guards';
import { File } from 'src/files';
import { UsersService } from '../services';

@Controller('users')
@UseGuards(JwtAuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async addAvatar(
    @Req() { user }: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(user, file);
  }

  @Get('files')
  async getAllPrivateFiles(@Req() { user }: AuthenticatedRequest) {
    return this.usersService.getAllPrivateFiles(user.id);
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(
    @Req() { user }: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addPrivateFile(user, file);
  }

  @Get('files/:id')
  async getPrivateFile(
    @Req() { user }: AuthenticatedRequest,
    @Param('id') id: File['id'],
    @Res() response: Response,
  ) {
    const { file, stream } = await this.usersService.getPrivateFile(user, id);
    response.type(file.mimetype);
    response.setHeader(
      'Content-Disposition',
      `inline; filename="${file.name}"`,
    );
    stream.pipe(response);
  }
}

export default UsersController;
