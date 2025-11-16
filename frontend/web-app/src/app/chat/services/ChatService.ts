import { Service } from '@andcreations/common';

@Service()
export class ChatService {
  private chatCompletionContent: string = '';
  private chatCompletionStream: ChatCompletionStream | null = null;

  public async createChatCompletion(
    input: CreateChatCompletionInput,
    stream: ChatCompletionStream,
  ): Promise<void> {
    this.chatCompletionContent = '';
    this.chatCompletionStream = stream;

    const words = TEXT.split(' ').map(word => word + ' ');
    while (words.length > 0) {
      const count = 1 + Math.round(Math.random() * 2);
      const chunk = words.splice(0, count).join(' ');
      this.chatCompletionContent += chunk;
      this.chatCompletionStream?.onModelTextChunk(chunk);
      const delay = Math.random() * 100 + 200;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    this.chatCompletionStream?.onFinish();
  }

  public streamChatCompletion(stream: ChatCompletionStream): void {
    if (this.chatCompletionContent.length > 0) {
      stream.onModelTextChunk(this.chatCompletionContent);
    }
  }
}

export interface CreateChatCompletionInput {
  userInput: string;
}

export interface ChatCompletionStream {
  onModelTextChunk: (chunk: string) => void;
  onFinish: () => void;
}

const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'