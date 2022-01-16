import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  AuthenticatedRequest,
  JwtAuthenticationGuard,
} from 'src/authentication';
import CreateCommentCommand from '../commands/create-comment.command';
import CommentCreate from '../dtos/comment-create.dto';

@Controller('comments')
@UseGuards(JwtAuthenticationGuard)
export default class CommentsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createComment(
    @Body() comment: CommentCreate,
    @Req() { user }: AuthenticatedRequest,
  ) {
    return this.commandBus.execute(new CreateCommentCommand(comment, user));
  }
}
