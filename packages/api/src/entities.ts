import { File, PrivateFile } from './files/entities';
import { Post, Category } from './posts/entities';
import { User, Address } from './users/entities';

export { Post, Category, User, Address, PrivateFile };
export const entities = [Post, Category, User, Address, File, PrivateFile];

export default entities;
