import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { User, UsersService } from 'src/users';

@Injectable({ scope: Scope.REQUEST })
export default class PostsLoaders {
  constructor(private usersService: UsersService) {}

  public readonly batchAuthors = new DataLoader(
    async (authorIds: [User['id']]) => {
      const users = await this.usersService.getByIds(authorIds);
      const usersMap = new Map(users.map((user) => [user.id, user]));
      return authorIds.map((authorId) => usersMap.get(authorId));
    },
  );
}
