import { StreamChunk } from './StreamChunk';

export class StreamAccumulator {
  private buffer: string = '';

  public constructor(private readonly callbacks: StreamAccumulatorCallbacks) {
  }

  private processLine(line: string): void {
    // parse the line as a stream chunk
    try {
      if (line.trim().length === 0) {
        return;
      }
      const chunk = JSON.parse(line) as StreamChunk<unknown>;
      this.callbacks.onStreamChunk(chunk);
    } catch (error) {
      const errorMsg = (error instanceof Error)
        ? error.message
        : 'Unknown error';
      this.callbacks.onError(
        new Error(`Failed to parse stream chunk "${line}": ${errorMsg}`)
      );
    }
  }

  private processBuffer(): void {
    while (true) {
      // find the next line
      const index = this.buffer.indexOf('\n');
      if (index === -1) {
        break;
      }
      const line = this.buffer.substring(0, index);
      this.buffer = this.buffer.substring(index + 1);
      this.processLine(line);
    }
  }


  public append(chunk: string): void {
    this.buffer += chunk;
    this.processBuffer();
  }

  public finish(): void {
    this.processLine(this.buffer);
    this.callbacks.onFinish();
  }
}

export interface StreamAccumulatorCallbacks {
  onStreamChunk: (chunk: StreamChunk<unknown>) => void;
  onFinish: () => void;
  onError: (error: Error) => void;
}