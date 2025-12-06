import { ModelChunkMessage } from '../messages';

export interface AgentStreamCallbacks {
  onModelChunk(chunk: ModelChunkMessage): Promise<void>;
}