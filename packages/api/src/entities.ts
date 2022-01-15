import { File, PrivateFile } from './files/entities';
import { Category, Post } from './posts/entities';
import { Address, User } from './users/entities';

export { Post, Category, User, Address, PrivateFile };
export const entities = [Post, Category, User, Address, File, PrivateFile];

export default entities;
