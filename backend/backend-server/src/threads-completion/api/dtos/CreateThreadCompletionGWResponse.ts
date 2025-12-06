import { GWMessage } from '../messages';

export interface CreateThreadCompletionGWResponse {
  messages: GWMessage<unknown>[];
}