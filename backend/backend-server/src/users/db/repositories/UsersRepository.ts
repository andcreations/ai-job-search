import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import { USERS_DB_CONNECTION } from '../consts';
import { UserEntity, USERS_TABLE_NAME } from '../entities';

@Injectable()
export class UsersRepository {
  public constructor(
    @Inject(USERS_DB_CONNECTION) private readonly db: Knex,
  ) {}

  public async createUser(user: UserEntity): Promise<void> {
    await this.db(USERS_TABLE_NAME).insert(user);
  }

  public async getUserByUsername(
    username: string
  ): Promise<UserEntity | undefined> {
    const user = await this.db<UserEntity>(USERS_TABLE_NAME)
      .where('username', username)
      .first();
    return user;
  }
}