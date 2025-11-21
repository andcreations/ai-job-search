import { Injectable } from '@nestjs/common';
import { ThreadsDBService } from '@ai-job-search/threads-db';

import { CreateThread, Thread } from '../types';
import { ThreadMapper } from './ThreadMapper';

@Injectable()
export class ThreadsService {
  public constructor(
    private readonly threadsDBService: ThreadsDBService,
    private readonly threadMapper: ThreadMapper,
  ) {}

  public async createThread(
    thread: CreateThread,
  ): Promise<Pick<Thread, 'id'>> {
    const { id: _id, ...entity } = this.threadMapper.toEntity({ 
      ...thread,
      id: '',
    });
    const { id } = await this.threadsDBService.createThread(entity);
    return { id };
  }
}