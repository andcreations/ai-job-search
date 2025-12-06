import { StreamChunk } from './StreamChunk';

export const MODEL_MESSAGE_STREAM_CHUNK_TYPE = 'model-message' as const;

export interface ModelMessageStreamChunkData {
  content: string;
}

export interface ModelMessageStreamChunk
  extends StreamChunk<ModelMessageStreamChunkData>
{
  type: typeof MODEL_MESSAGE_STREAM_CHUNK_TYPE;
  data: ModelMessageStreamChunkData;
}