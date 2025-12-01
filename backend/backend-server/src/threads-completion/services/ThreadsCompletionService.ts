import { Injectable } from '@nestjs/common';
import { AgentProvider, Message } from '@ai-job-search/agent';
import { ThreadsService } from '@ai-job-search/threads';

@Injectable()
export class ThreadsCompletionService {
  public constructor(
    private readonly threadsService: ThreadsService,
    private readonly agentProvider: AgentProvider,
  ) {}

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
}

export interface ThreadCompletionInput {
  threadId: string;
  userId: string;
  userMessage: string;
}

export interface ThreadCompletionOutput {
  messages: Message[];
}
