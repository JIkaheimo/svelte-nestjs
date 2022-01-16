import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthenticatedRequest,
  JwtAuthenticationGuard,
} from 'src/authentication';
import { CreateCommentCommand } from '../commands';
import { CommentCreate } from '../dtos';
import { GetCommentsQuery } from '../queries';

@Controller('comments')
@UseGuards(JwtAuthenticationGuard)
export class CommentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getComments(@Query() { postId }) {
    return this.queryBus.execute(new GetCommentsQuery(postId));
  }

  @Post()
  async createComment(
    @Body() comment: CommentCreate,
    @Req() { user }: AuthenticatedRequest,
  ) {
    return this.commandBus.execute(new CreateCommentCommand(comment, user));
  }
}

export default CommentsController;
