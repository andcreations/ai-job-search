import { Service } from '@andcreations/common';
import { 
  ThreadsCompletionAPI,
  StreamChunk,
  StreamAccumulator,
} from '@ai-job-search/threads-completion-api';

import { ThreadsService } from '../../threads';

@Service()
export class ThreadsCompletionService {
  private streamAbortController: AbortController | null = null;
  private streamCancelled: boolean = false;

  public constructor(private readonly threadsService: ThreadsService) {
  }
  
  public async streamChatCompletion(
    input: StreamChatCompletionInput,
    callbacks: ChatCompletionCallbacks,    
  ): Promise<void> {
    this.streamAbortController = new AbortController();
    this.streamCancelled = false;

    const accumulator = new StreamAccumulator({
      onStreamChunk: (chunk) => {
        callbacks.onStreamChunk(chunk);
      },
      onFinish: () => {
        callbacks.onFinish();
      },
      onError: (error) => {
        callbacks.onError(error);
      },
    });

    const response = await fetch(
      ThreadsCompletionAPI.url.streamThreadCompletion(),
      { 
        signal: this.streamAbortController.signal,
        method: 'POST',
        body: JSON.stringify({
          threadId: this.threadsService.getThreadId(),
          userMessage: input.userMessage,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/plain',
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    try {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      while (true) {
        const { value, done } = await reader.read();
        if (done || this.streamCancelled) break;

        const chunk = decoder.decode(value, { stream: true });
        // callbacks.onModelTextChunk(chunk);
        accumulator.append(chunk);
      }
      accumulator.finish();
    } catch (error) {
      if (error instanceof Error) { 
        callbacks.onError(error);
      } else {
        callbacks.onError(new Error('Unknown error'));
      }
    }
    finally {
      this.streamAbortController = null;
      this.streamCancelled = false;
    }
  }

  public async cancelChatCompletionStream(): Promise<void> {
    if (this.streamAbortController) {
      this.streamCancelled = true;
      this.streamAbortController.abort();
    }
  }  
}

export interface StreamChatCompletionInput {
  userMessage: string;
}

export interface ChatCompletionCallbacks {
  onStreamChunk: (chunk: StreamChunk<unknown>) => void;
  onFinish: () => void;
  onError: (error: Error) => void;
}