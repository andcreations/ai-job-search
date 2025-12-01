import { Inject, Injectable } from '@nestjs/common';
import { BaseLanguageModel } from '@langchain/core/language_models/base';
import { ChatOpenAI } from '@langchain/openai';
import { requireStrEnv } from '@ai-job-search/common';

import { AgentCfg } from '../../types';
import {
  LangChainAgent,
  CheckpointSaverProvider,
  CHECKPOINT_SAVER,
} from '../lang-chain';

@Injectable()
export class OpenAIAgent extends LangChainAgent {
  public static readonly NAME = 'openai';

  public constructor(
    @Inject(CHECKPOINT_SAVER) checkpointSaver: CheckpointSaverProvider,
  ) {
    super(OpenAIAgent.NAME, checkpointSaver);
  }

  protected createModel(agentCfg: AgentCfg): BaseLanguageModel {
    return new ChatOpenAI({
      apiKey: requireStrEnv('OPENAI_API_KEY'),
      model: agentCfg.model,
    });
  }
}