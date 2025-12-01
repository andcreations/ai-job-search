import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';
import { SqliteSaver } from '@langchain/langgraph-checkpoint-sqlite';
import { BOOTSTRAP_CONTEXT } from '@ai-job-search/core';
import { Logger } from '@ai-job-search/log';
import { SQLiteUtils } from '@ai-job-search/sqlite';

import { CheckpointSaverProvider } from './CheckpointSaverProvider';

@Injectable()
export class SQLiteCheckpointSaverProvider
  extends CheckpointSaverProvider
  implements OnModuleInit
{
  private readonly dbPath: string;

  public constructor(private readonly logger: Logger) {
    super();
    this.dbPath = SQLiteUtils.getSQLiteDBFilePath('checkpoints');
  }

  public async onModuleInit(): Promise<void> {
    await this.init();
  }

  protected async createCheckpointSaver(): Promise<BaseCheckpointSaver> {
    this.logger.info(
      `Creating SQLite checkpoint saver`,
      {
        ...BOOTSTRAP_CONTEXT,
        dbPath: this.dbPath,
      }
    );

    // create database
    const db = new sqlite3.Database(this.dbPath);

    // create checkpoint saver
    return new SqliteSaver(db);
  }
}