import { ThreadEntityWithoutTimestamps } from '../entities';

export type CreateThreadEntity = Omit<ThreadEntityWithoutTimestamps, 'id'>;
