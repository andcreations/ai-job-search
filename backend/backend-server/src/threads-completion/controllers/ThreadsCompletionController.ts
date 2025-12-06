import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  Auth,
  type AuthUser,
  InjectUser,
  ResponseError,
} from '@ai-job-search/gateway';
import { 
  StreamChunk,
  ThreadsCompletionAPI,
} from '@ai-job-search/threads-completion-api';

import {
  CreateThreadCompletionGWRequestImpl,
  CreateThreadCompletionGWResponseImpl,
  StreamThreadCompletionGWRequestImpl,
} from '../dtos';
import { 
  StreamCompletionCallbacks,
  ThreadMessagesMapper,
  ThreadsCompletionService,
} from '../services';

@Controller(ThreadsCompletionAPI.URL)
export class ThreadsCompletionController {
  public constructor(
    private readonly threadsCompletionService: ThreadsCompletionService,
    private readonly threadMessagesMapper: ThreadMessagesMapper,
  ) {}

  @Auth()
  @Post('/create')
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

  @Auth()
  @Post('/stream')
  public async streamThreadCompletion(
    @Body() request: StreamThreadCompletionGWRequestImpl,
    @InjectUser() user: AuthUser,
    @Res() response: Response,
  ): Promise<void> {
    // headers for streaming
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.setHeader('Transfer-Encoding', 'chunked');
    response.setHeader('Cache-Control', 'no-cache');    

    const callbacks: StreamCompletionCallbacks = {
      onStreamChunk: async (chunk: StreamChunk) => {
        response.write(JSON.stringify(chunk) + '\n');
      },
    };
    try {
      await this.threadsCompletionService.streamThreadCompletion(
        {
          threadId: request.threadId,
          userId: user.id,
          userMessage: request.userMessage,
        },
        callbacks,
      );
    } catch (error) {
      ResponseError.set(response, error);
    } finally {
      response.end();
    }
  }
}