export const THREADS_TABLE_NAME = 'threads';

export class ThreadEntity {
  public id: string;
  public user_id: string;
  public created_at: Date;
  public updated_at: Date;
}

export type ThreadEntityWithoutTimestamps = Omit<
  ThreadEntity, 'created_at' | 'updated_at'
>;