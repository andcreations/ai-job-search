import { Module } from '@nestjs/common';
import { LogModule } from '@ai-job-search/log';

import { AgentController } from './controllers';
import { AgentProvider, AgentService } from './services';
import { AGENT_PROVIDERS, AGENTS } from './agents';

@Module({
  imports: [LogModule],
  providers: [
    ...AGENT_PROVIDERS,
    ...Object.values(AGENTS),
    AgentProvider,
    AgentService,
  ],
  controllers: [AgentController],
  exports: [AgentProvider],
})
export class AgentModule {}