import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import { THREADS_DB_CONNECTION } from '../consts';
import {
  THREADS_CFG_TABLE_NAME,
  ThreadCfgEntity,
  ThreadCfgEntityWithoutTimestamps,
} from '../entities';

@Injectable()
export class ThreadsCfgRepository {
  public constructor(
    @Inject(THREADS_DB_CONNECTION) private readonly db: Knex,
  ) {}  

  public async upsertThreadCfg(
    threadCfg: ThreadCfgEntityWithoutTimestamps,
  ): Promise<void> { 
    // check if exists
    const existing = await this.db(THREADS_CFG_TABLE_NAME)
      .where('name', threadCfg.name)
      .forUpdate()
      .first();

    // upsert
    if (existing) {
      // update
      await this.db(THREADS_CFG_TABLE_NAME)
        .where('id', existing.id)
        .update({ cfg: threadCfg.cfg });
    } else {
      // insert
      await this.db(THREADS_CFG_TABLE_NAME).insert({
        ...threadCfg,
        cfg: threadCfg.cfg,
      });
    }
  }

  public async readThreadCfg(
    name: string,
  ): Promise<ThreadCfgEntity | undefined> {
    const entity = await this.db(THREADS_CFG_TABLE_NAME)
      .where('name', name)
      .first();
    return entity;
  }
}