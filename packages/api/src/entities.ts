import { Message } from './chat/entities';
import { Comment } from './comments/entities';
import { File, PrivateFile } from './files/entities';
import { Category, Post } from './posts/entities';
import { Report } from './reports/entities';
import { Address, User } from './users/entities';

export { Post, Category, User, Address, PrivateFile, Comment, Message, Report };

export const entities = [
  Post,
  Comment,
  Category,
  User,
  Address,
  File,
  PrivateFile,
  Message,
  Report,
];

export default entities;
