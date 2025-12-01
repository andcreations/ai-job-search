import { Message } from '../types';

export const USER_MESSAGE_TYPE = 'user-message' as const;

export interface UserMessageData {
  content: string;
}

// Represents a message entered by the user.
export interface UserMessage extends Message<UserMessageData> {
  type: typeof USER_MESSAGE_TYPE;
}