import { IdGenerator, InjectIdGenerator } from '@ai-job-search/common';

import { UserEntity } from '../entities';
import { UsersRepository } from '../repositories';
import { CreateUserEntity } from '../types';

export class UsersDBService {
  public constructor(
    @InjectIdGenerator() private readonly idGenerator: IdGenerator,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async createUser(user: CreateUserEntity): Promise<void> {
    await this.usersRepository.createUser({
      ...user,
      id: this.idGenerator(),
    });
  }

  public async getUserByUsername(
    username: string,
  ): Promise<UserEntity | undefined> {
    return this.usersRepository.getUserByUsername(username);
  }
}