import { Module } from '@nestjs/common';
import { AgentModule } from '@ai-job-search/agent';

import { ThreadDBModule } from './db';
import { ThreadsCfgService, ThreadsMapper, ThreadsService } from './services';
import { ThreadsCfgController, ThreadsController } from './controllers';

@Module({
  imports: [ThreadDBModule, AgentModule],
  providers: [ThreadsCfgService, ThreadsMapper, ThreadsService],
  controllers: [ThreadsCfgController, ThreadsController],
  exports: [ThreadsService],
})
export class ThreadsModule {}