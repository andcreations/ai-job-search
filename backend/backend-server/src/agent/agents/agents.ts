import { Provider, Type } from '@nestjs/common';

import { Agent } from '../types';
import {
  CHECKPOINT_SAVER,
  SQLiteCheckpointSaverProvider,
} from './lang-chain';
import { OpenAIAgent } from './open-ai';

export const AGENT_PROVIDERS: Provider[] = [
  {
    provide: CHECKPOINT_SAVER,
    useClass: SQLiteCheckpointSaverProvider,
  },
];

export const AGENTS: Record<string, Type<Agent>> = {
  [OpenAIAgent.NAME]: OpenAIAgent,
};