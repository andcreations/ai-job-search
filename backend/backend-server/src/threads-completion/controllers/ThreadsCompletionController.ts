import { Body, Controller, Post } from '@nestjs/common';
import { Auth, AuthUser, InjectUser } from '@ai-job-search/gateway';
import { ThreadsCompletionAPI } from '@ai-job-search/threads-completion-api';

import {
  CreateThreadCompletionGWRequestImpl,
  CreateThreadCompletionGWResponseImpl,
} from '../dtos';
import { ThreadMessagesMapper, ThreadsCompletionService } from '../services';

@Controller(ThreadsCompletionAPI.URL)
export class ThreadsCompletionController {
  public constructor(
    private readonly threadsCompletionService: ThreadsCompletionService,
    private readonly threadMessagesMapper: ThreadMessagesMapper,
  ) {}

  @Auth()
  @Post()
  public async createThreadCompletion(
    @Body() request: CreateThreadCompletionGWRequestImpl,
    @InjectUser() user: AuthUser,
  ): Promise<CreateThreadCompletionGWResponseImpl> {
    const output = await this.threadsCompletionService.createThreadCompletion({
      threadId: request.threadId,
      userId: user.id,
      userMessage: request.userMessage,
    });
    return {
      messages: this.threadMessagesMapper.toGWMessages(output.messages),
    };
  }
}