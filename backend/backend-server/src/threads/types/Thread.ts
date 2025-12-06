import { ThreadCfg } from './ThreadCfg';

export interface Thread {
  id: string;
  userId: string;
  threadCfg: ThreadCfg;
}