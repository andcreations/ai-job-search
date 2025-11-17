import { Module } from '@nestjs/common';
import Knex from 'knex'
import { BOOTSTRAP_CONTEXT } from '@ai-job-search/core';
import { IdGeneratorProvider } from '@ai-job-search/common';
import { getLogger } from '@ai-job-search/log';
import { SQLiteUtils } from '@ai-job-search/sqlite';

import { USERS_DB_CONNECTION, USERS_DB_NAME } from './consts';
import { UsersRepository } from './repositories';
import { UsersDBService } from './services';

@Module({
  providers: [
    {
      provide: USERS_DB_CONNECTION,
      useFactory: async () => {
        const context = BOOTSTRAP_CONTEXT;

        const dbFilePath = SQLiteUtils.getSQLiteDBFilePath(USERS_DB_NAME);
        const migrationsDir = SQLiteUtils.getSQLiteMigrationsDir(USERS_DB_NAME);
        getLogger().info('Users database', {
          ...context,
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
          getLogger().info('Users database migrated', {
            ...context,
            result: JSON.stringify(result),
          });
        } catch (error) {
          getLogger().error(
            'Failed to migrate users database',
            context,
            error,
          );
          throw error;
        }

        return knex;
      },
    },
    IdGeneratorProvider,
    UsersRepository,
    UsersDBService,
  ],
  exports: [UsersDBService],
})
export class UsersDBModule {}