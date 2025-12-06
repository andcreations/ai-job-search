import { Injectable } from '@nestjs/common';
import { 
  Message,
  ModelChunkMessage,
  AgentProvider,
} from '@ai-job-search/agent';
import { ThreadsService } from '@ai-job-search/threads';
import {
  StreamChunk,
  MODEL_MESSAGE_STREAM_CHUNK_TYPE,
  ModelMessageStreamChunk,
} from '@ai-job-search/threads-completion-api';

@Injectable()
export class ThreadsCompletionService {
  public constructor(
    private readonly threadsService: ThreadsService,
    private readonly agentProvider: AgentProvider,
  ) {
    // setTimeout(async () => {
    //   await this.streamThreadCompletion({
    //     threadId: '019ab74a-9899-717c-a23b-5aa1bab5a527',
    //     userId: '019a933e-710c-728f-ae9e-c2342db34887',
    //     userMessage: 'Hello, how are you?',
    //   });
    // }, 1000);
  }

  public async createThreadCompletion(
    input: ThreadCompletionInput,
  ): Promise<ThreadCompletionOutput> {
    const thread = await this.threadsService.readThread(
      input.threadId,
      input.userId,
    );
    const agent = await this.agentProvider.getAgent(thread.threadCfg.agent);
    const completion = await agent.invoke({
      userMessage: input.userMessage,
      threadId: thread.id,
    });
    return { messages: completion.messages };
  }

  public async streamThreadCompletion(
    input: ThreadCompletionInput,
    callbacks: StreamCompletionCallbacks,
  ): Promise<void> {
    const thread = await this.threadsService.readThread(
      input.threadId,
      input.userId,
    );
    const agent = await this.agentProvider.getAgent(thread.threadCfg.agent);
    await agent.stream({
      userMessage: input.userMessage,
      threadId: thread.id,
    }, {
      onModelChunk: async (chunk: ModelChunkMessage) => {
        const streamChunk: ModelMessageStreamChunk = {
          type: MODEL_MESSAGE_STREAM_CHUNK_TYPE,
          data: chunk.data,
        };
        await callbacks.onStreamChunk(streamChunk);
      },
    });
  }
}

export interface ThreadCompletionInput {
  threadId: string;
  userId: string;
  userMessage: string;
}

export interface ThreadCompletionOutput {
  messages: Message[];
}

export interface StreamCompletionInput {
  threadId: string;
  userId: string;
  userMessage: string;
}

export interface StreamCompletionCallbacks {
  onStreamChunk(chunk: StreamChunk): Promise<void>;
}