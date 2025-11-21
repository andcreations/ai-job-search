import { Injectable } from '@nestjs/common';
import { IdGenerator, InjectIdGenerator } from '@ai-job-search/common';

import { ThreadsRepository } from '../repositories'; 
import { CreateThreadEntity } from '../types';
import { ThreadEntity } from '../entities';

@Injectable()
export class ThreadsDBService {
  public constructor(
    private readonly threadsRepository: ThreadsRepository,
    @InjectIdGenerator() private readonly idGenerator: IdGenerator,
  ) {}

  public async createThread(
    thread: CreateThreadEntity,
  ): Promise<Pick<ThreadEntity, 'id'>> {
    const id = this.idGenerator();
    await this.threadsRepository.createThread({
      ...thread,
      id,
    });
    return { id };
  }
}