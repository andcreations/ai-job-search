import { Module } from '@nestjs/common';
import { LogModule } from '@ai-job-search/log';
import { AgentModule } from '@ai-job-search/agent';
import { ThreadsModule } from '@ai-job-search/threads';

import { ThreadsCompletionService, ThreadMessagesMapper } from './services';
import { ThreadsCompletionController } from './controllers';

@Module({
  imports: [ LogModule, ThreadsModule, AgentModule ],
  providers: [ ThreadsCompletionService, ThreadMessagesMapper ],
  controllers: [ ThreadsCompletionController ],
})
export class ThreadsCompletionModule {}