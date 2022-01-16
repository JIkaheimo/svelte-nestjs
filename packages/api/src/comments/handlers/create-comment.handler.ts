import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentCommand } from '../commands';
import { Comment } from '../entities';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  async execute(command: CreateCommentCommand) {
    const { author, comment } = command;
    const newPost = await this.repository.create({ author, ...comment });
    await this.repository.save(newPost);
    return newPost;
  }
}

export default CreateCommentHandler;
