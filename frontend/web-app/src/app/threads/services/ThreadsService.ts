import { OnBootstrap, Service } from '@andcreations/common';
import { HTTPWebClientService } from '@andcreations/web-common';
import {
  CreateThreadGWRequest,
  CreateThreadGWResponse,
  ThreadsAPI,
 } from '@ai-job-search/threads-api';

import { Log } from '../../log';

@Service()
export class ThreadsService implements OnBootstrap {
  private threadId: string | null = null;

  public constructor(private readonly http: HTTPWebClientService) {
  }

  public async onBootstrap(): Promise<void> {
    try {
      await this.createThread();
    } catch (error) {
      Log.error('Failed to create chat thread', error);
    }
  }

  public async createThread(): Promise<void> {
    Log.debug('Creating chat thread');
    const request: CreateThreadGWRequest = {};
    const response = await this.http.post<
      CreateThreadGWRequest,
      CreateThreadGWResponse
    >(
      ThreadsAPI.url.createThread(),
      request,
    );
    this.threadId = response.data.id;
    Log.info(`Created chat thread ${this.threadId}`);
  }

  public hasThreadId(): boolean {
    return this.threadId !== null;
  }

  public getThreadId(): string | null {
    return this.threadId;
  }
}
