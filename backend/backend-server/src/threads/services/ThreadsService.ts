import { Injectable } from '@nestjs/common';
import {  ThreadsDBService } from '@ai-job-search/threads-db';

import { Thread } from '../types';
import { ThreadNotFoundError } from '../errors';
import { ThreadsMapper } from './ThreadsMapper';
import { ThreadsCfgService } from './ThreadsCfgService';

@Injectable()
export class ThreadsService {
  public constructor(
    private readonly threadsCfgService: ThreadsCfgService,
    private readonly threadsDBService: ThreadsDBService,
    private readonly threadMapper: ThreadsMapper,
  ) {}

  public async createThread(userId: string): Promise<Pick<Thread, 'id'>> {
    const threadCfg = await this.threadsCfgService.readDefaultThreadCfg();
    const { id: _id, ...entity } = this.threadMapper.toEntity({ 
      id: '',
      userId,
      threadCfg,
    });
    const { id } = await this.threadsDBService.createThread(entity);
    return { id };
  }

  public async readThread(threadId: string, userId: string): Promise<Thread> {
    const entity = await this.threadsDBService.readThread(threadId);
    if (!entity || entity.user_id !== userId) {
      throw new ThreadNotFoundError(threadId);
    }
    return this.threadMapper.fromEntity(entity);
  }
} 