import { Service } from '@andcreations/common';
import { AgentAPI } from '@ai-job-search/agent-api';

@Service()
export class AgentService {
  private streamAbortController: AbortController | null = null;
  private streamCancelled: boolean = false;

  public async streamChatCompletion(
    input: CreateChatCompletionInput,
    stream: ChatCompletionStream,    
  ): Promise<void> {
    this.streamAbortController = new AbortController();
    this.streamCancelled = false;
    
    const response = await fetch(
      AgentAPI.url.createChatCompletion(),
      { 
        signal: this.streamAbortController.signal,
        method: 'POST',
        body: JSON.stringify({ userInput: input.userInput })
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
        stream.onModelTextChunk(chunk);
      }
      stream.onFinish();
    } catch (error) {
      if (error instanceof Error) { 
        stream.onError(error);
      } else {
        stream.onError(new Error('Unknown error'));
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

export interface CreateChatCompletionInput {
  userInput: string;
}

export interface ChatCompletionStream {
  onModelTextChunk: (chunk: string) => void;
  onFinish: () => void;
  onError: (error: Error) => void;
}
