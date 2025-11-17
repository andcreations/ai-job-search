import { Module } from '@nestjs/common';

import { AgentController } from './controllers';
import { AgentService } from './services';

@Module({
  imports: [],
  providers: [AgentService],
  controllers: [AgentController],
})
export class AgentModule {}