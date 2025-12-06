import Knex from 'knex'
import { BOOTSTRAP_CONTEXT } from '@ai-job-search/core';

import { getLogger } from '../../log';
import { SQLiteUtils } from './SQLiteUtils';

export class SQLiteProviderFactory {
  public static async create(dbName: string): Promise<Knex.Knex> {
    const context = BOOTSTRAP_CONTEXT;

    const dbFilePath = SQLiteUtils.getSQLiteDBFilePath(dbName);
    const migrationsDir = SQLiteUtils.getSQLiteMigrationsDir(dbName);
    getLogger().info('Initializing SQLite database', {
      ...context,
      dbName,
      dbFilePath,
      migrationsDir,
    });

    const knex = Knex({
      client: 'sqlite3',
      connection: {
        filename: dbFilePath,
      },
      migrations: {
        tableName: '_migrations',
        directory: migrationsDir,
      },
      useNullAsDefault: true,
    });

    try {
      const result = await knex.migrate.latest();
      getLogger().info('Database migrated', {
        ...context,
        dbName,
        result: JSON.stringify(result),
      });
    } catch (error) {
      getLogger().error(
        'Failed to migrate database',
        {
          ...context,
          dbName,
        },
        error,
      );
      throw error;
    }

    return knex;    
  }
}