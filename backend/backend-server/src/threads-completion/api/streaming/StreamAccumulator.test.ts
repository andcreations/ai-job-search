import { StreamChunk } from './StreamChunk';
import {
  MODEL_MESSAGE_STREAM_CHUNK_TYPE,
  ModelMessageStreamChunk,
} from './ModelMessageStreamChunk';
import { StreamAccumulator } from './StreamAccumulator';

describe('StreamAccumulator', () => {
  const modelMessageChunk = (
    content: string,
  ): ModelMessageStreamChunk => {
    const chunk: ModelMessageStreamChunk = {
      type: 'model-message',
      data: {
        content,
      },
    };
    return chunk;
  };

  const expectChunksToBe = (
    chunks: StreamChunk<unknown>[],
    ...expectedChunks: ModelMessageStreamChunk[]
  ): void => {
    expect(chunks).toHaveLength(expectedChunks.length);
    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index];
      const expectedChunk = expectedChunks[index];
      expect(chunk.type).toBe(expectedChunk.type);
      expect(chunk.data).toEqual(expectedChunk.data);
    }
  }

  it('should return a stream chunk from a single chunk', () => {
    const chunks: StreamChunk<unknown>[] = [];
    let finished = false;
    let caughtError = null;
    const acc = new StreamAccumulator({
      onStreamChunk: (chunk) => {
        chunks.push(chunk);
      },
      onFinish: () => {
        finished = true;
      },
      onError: (error) => {
        caughtError = error;
      },
    });

    const chunk0 = modelMessageChunk('Hello, world!');
    acc.append(JSON.stringify(chunk0));
    acc.finish();

    expect(caughtError).toBeNull();
    expect(finished).toBe(true);
    expectChunksToBe(chunks, chunk0);
  });

  it('should ignore empty chunks', () => {
    const chunks: StreamChunk<unknown>[] = [];
    let finished = false;
    let caughtError = null;
    const acc = new StreamAccumulator({
      onStreamChunk: (chunk) => {
        chunks.push(chunk);
      },
      onFinish: () => {
        finished = true;
      },
      onError: (error) => {
        caughtError = error;
      },
    });

    const chunk0 = modelMessageChunk('Hello, world!');
    acc.append(JSON.stringify(chunk0));
    acc.append('\n');
    acc.finish();

    expect(caughtError).toBeNull();
    expect(finished).toBe(true);
    expectChunksToBe(chunks, chunk0);
  });

  it('should return a stream chunk from two chunks', () => {
    const chunks: StreamChunk<unknown>[] = [];
    let finished = false;
    let caughtError = null;
    const acc = new StreamAccumulator({
      onStreamChunk: (chunk) => {
        chunks.push(chunk);
      },
      onFinish: () => {
        finished = true;
      },
      onError: (error) => {
        caughtError = error;
      },
    });

    const chunk0 = modelMessageChunk('Hello! I am a stream accumulator.');
    const chunk0Str = JSON.stringify(chunk0);
    const index0 = 11;
    const chunk0a = chunk0Str.substring(0, index0);
    const chunk0b = chunk0Str.substring(index0);
    acc.append(chunk0a);
    acc.append(chunk0b);
    acc.finish();

    expect(caughtError).toBeNull();
    expect(finished).toBe(true);
    expectChunksToBe(chunks, chunk0);
  });

  it('should return two stream chunks from two chunks', () => {
    const chunks: StreamChunk<unknown>[] = [];
    let finished = false;
    let caughtError = null;
    const acc = new StreamAccumulator({
      onStreamChunk: (chunk) => {
        chunks.push(chunk);
      },
      onFinish: () => {
        finished = true;
      },
      onError: (error) => {
        caughtError = error;
      },
    });

    const chunk0 = modelMessageChunk('Hi there!');
    const chunk0Str = JSON.stringify(chunk0);
    const chunk1 = modelMessageChunk('Nice to meet you!');
    const chunk1Str = JSON.stringify(chunk1);

    const chunkStr = chunk0Str + '\n' + chunk1Str;
    const index = 24;
    const chunkA = chunkStr.substring(0, index);
    const chunkB = chunkStr.substring(index);

    acc.append(chunkA);
    acc.append(chunkB);
    acc.finish();

    expect(caughtError).toBeNull();
    expect(finished).toBe(true);
    expectChunksToBe(chunks, chunk0, chunk1);
  });  
})