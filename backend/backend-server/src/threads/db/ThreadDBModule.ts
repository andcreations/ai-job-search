import { Module } from '@nestjs/common';
import { IdGeneratorProvider } from '@ai-job-search/common';
import { SQLiteProviderFactory } from '@ai-job-search/sqlite';

import { THREADS_DB_CONNECTION, THREADS_DB_NAME } from './consts';
import { ThreadsRepository } from './repositories';
import { ThreadsDBService } from './services';

@Module({
  providers: [
    {
      provide: THREADS_DB_CONNECTION,
      useFactory: () => SQLiteProviderFactory.create(THREADS_DB_NAME),
    },
    IdGeneratorProvider,
    ThreadsRepository,
    ThreadsDBService,
  ],
  exports: [ThreadsDBService],
})
export class ThreadDBModule {
}