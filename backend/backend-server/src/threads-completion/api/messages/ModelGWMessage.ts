import { GWMessage } from './GWMessage';

export const MODEL_GW_MESSAGE_TYPE = 'model-message' as const;

export interface ModelGWMessageData {
  content: string;
}

// Represents a message entered by the model.
export interface ModelGWMessage extends GWMessage<ModelGWMessageData> {
  type: typeof MODEL_GW_MESSAGE_TYPE;
}