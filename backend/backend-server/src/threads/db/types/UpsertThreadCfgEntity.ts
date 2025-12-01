import { ThreadCfgEntityWithoutTimestamps } from '../entities';

export type UpsertThreadCfgEntity =
  Omit<ThreadCfgEntityWithoutTimestamps, 'id'>;
