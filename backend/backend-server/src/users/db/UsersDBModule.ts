import { Module } from '@nestjs/common';
import { IdGeneratorProvider } from '@ai-job-search/common';
import { SQLiteProviderFactory } from '@ai-job-search/sqlite';

import { USERS_DB_CONNECTION, USERS_DB_NAME } from './consts';
import { UsersRepository } from './repositories';
import { UsersDBService } from './services';

@Module({
  providers: [
    {
      provide: USERS_DB_CONNECTION,
      useFactory: () => SQLiteProviderFactory.create(USERS_DB_NAME),
    },
    IdGeneratorProvider,
    UsersRepository,
    UsersDBService,
  ],
  exports: [UsersDBService],
})
export class UsersDBModule {}