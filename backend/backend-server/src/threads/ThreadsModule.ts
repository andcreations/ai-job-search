import { Module } from '@nestjs/common';

import { ThreadDBModule } from './db';
import { ThreadMapper, ThreadsService } from './services';
import { ThreadsController } from './controllers';

@Module({
  imports: [ThreadDBModule],
  providers: [ThreadMapper,ThreadsService],
  controllers: [ThreadsController],
})
export class ThreadsModule {}