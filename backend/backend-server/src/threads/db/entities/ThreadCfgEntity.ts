export const THREADS_CFG_TABLE_NAME = 'thread_cfgs';

export class ThreadCfgEntity {
  public id: string;
  public name: string;
  public cfg: Buffer;
  public created_at: Date;
  public updated_at: Date;
}

export type ThreadCfgEntityWithoutTimestamps = Omit<
  ThreadCfgEntity, 'created_at' | 'updated_at'
>;