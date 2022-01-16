import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentsController from '../controllers/comments.controller';
import { Comment } from '../entities';
import { CreateCommentHandler } from '../handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
  controllers: [CommentsController],
  providers: [CreateCommentHandler],
})
export class CommentsModule {}
