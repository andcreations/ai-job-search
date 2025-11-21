import { Controller, Post } from '@nestjs/common';
import { Auth, AuthUser, InjectUser } from '@ai-job-search/gateway';
import { ThreadsAPI } from '@ai-job-search/threads-api';

import { CreateThreadGWResponseImpl } from '../dtos';
import { ThreadsService } from '../services';

@Controller(ThreadsAPI.URL)
export class ThreadsController {
  public constructor(private readonly threadService: ThreadsService) {
  }

  @Post()
  @Auth()
  public async createThread(
    @InjectUser() user: AuthUser,
  ): Promise<CreateThreadGWResponseImpl> {
    const { id } = await this.threadService.createThread({ userId: user.id });
    return { id };
  }
}