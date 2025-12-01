import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import { THREADS_DB_CONNECTION } from '../consts';
import { 
  THREADS_TABLE_NAME,
  ThreadEntity,
  ThreadEntityWithoutTimestamps,
} from '../entities';

@Injectable()
export class ThreadsRepository {
  public constructor(
    @Inject(THREADS_DB_CONNECTION) private readonly db: Knex,
  ) {}

  public async createThread(
    thread: ThreadEntityWithoutTimestamps,
  ): Promise<void> {
    await this.db(THREADS_TABLE_NAME).insert(thread);
  }

  public async readThread(
    threadId: string,
  ): Promise<ThreadEntity> {
    return await this.db(THREADS_TABLE_NAME).where('id', threadId).first();
  }
}