import { ThreadEntityWithoutTimestamps } from '@ai-job-search/threads-db';

import { Thread } from '../types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThreadMapper {
  public toEntity(thread: Thread): ThreadEntityWithoutTimestamps {
    return {
      id: thread.id,
      user_id: thread.userId,
    };
  }
}