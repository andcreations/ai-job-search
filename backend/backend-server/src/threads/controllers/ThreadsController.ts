import { Body, Controller, Post } from '@nestjs/common';
import { Auth, AuthUser, InjectUser } from '@ai-job-search/gateway';
import { ThreadsAPI } from '@ai-job-search/threads-api';

import { CreateThreadGWRequestImpl, CreateThreadGWResponseImpl } from '../dtos';
import { ThreadsService } from '../services';

@Controller(ThreadsAPI.URL)
export class ThreadsController {
  public constructor(private readonly threadService: ThreadsService) {
  }

  @Post()
  @Auth()
  public async createThread(
    @Body() request: CreateThreadGWRequestImpl,
    @InjectUser() user: AuthUser,
  ): Promise<CreateThreadGWResponseImpl> {
    const { id } = await this.threadService.createThread(user.id);
    return { id };
  }
}