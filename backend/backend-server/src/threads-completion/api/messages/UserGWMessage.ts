import { GWMessage } from './GWMessage';

export const USER_GW_MESSAGE_TYPE = 'user-message' as const;

export interface UserGWMessageData {
  content: string;
}

// Represents a message entered by the user.
export interface UserGWMessage extends GWMessage<UserGWMessageData> {
  type: typeof USER_GW_MESSAGE_TYPE;
}