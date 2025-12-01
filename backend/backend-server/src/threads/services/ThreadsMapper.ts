import { Injectable } from '@nestjs/common';
import {
  ThreadEntity,
  ThreadEntityWithoutTimestamps,
} from '@ai-job-search/threads-db';

import { Thread } from '../types';

@Injectable()
export class ThreadsMapper {
  public toEntity(thread: Thread): ThreadEntityWithoutTimestamps {
    return {
      id: thread.id,
      user_id: thread.userId,
      thread_cfg: Buffer.from(JSON.stringify(thread.threadCfg)),
    };
  }

  public fromEntity(thread?: ThreadEntity): Thread | null {
    if (!thread) {
      return null;
    }
    return {
      id: thread.id,
      userId: thread.user_id,
      threadCfg: JSON.parse(thread.thread_cfg.toString()),
    };
  }
}