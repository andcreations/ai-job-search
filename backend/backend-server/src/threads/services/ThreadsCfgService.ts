import { Injectable } from '@nestjs/common';
import { AIJobSearchError, requireStrEnv } from '@ai-job-search/common';
import {
  InvalidObjectError,
  ObjectValidationHelper,
} from '@ai-job-search/common';
import { AgentProvider } from '@ai-job-search/agent';

import { ThreadCfg } from '../types';
import { UpsertThreadCfgGWRequestImpl } from '../dtos';
import { InvalidThreadCfgError } from '../errors';
import { ThreadsCfgDBService } from '../db';

@Injectable()
export class ThreadsCfgService {
  private readonly defaultThreadCfgName: string;

  public constructor(
    private readonly agentProvider: AgentProvider,
    private readonly threadsCfgDBService: ThreadsCfgDBService,
  ) {
    this.defaultThreadCfgName = requireStrEnv('DEFAULT_THREAD_CFG_NAME');
  }

  public async upsertThreadCfg(
    request: UpsertThreadCfgGWRequestImpl,
  ): Promise<void> {
    // validate configuration
    try {
      ObjectValidationHelper.validateObject(request.cfg, ThreadCfg);
    } catch (error) {
      if (error instanceof InvalidObjectError) {
        throw new InvalidThreadCfgError(error.message);
      }
      throw error;
    }
    const cfg = request.cfg as ThreadCfg;
    if (!this.agentProvider.hasAgent(cfg.agent.name)) {
      throw new InvalidThreadCfgError(
        `Agent ${AIJobSearchError.quote(cfg.agent.name)} not found`
      );
    }

    // upsert
    await this.threadsCfgDBService.upsertThreadCfg(request.name, request.cfg);
  }

  public async readDefaultThreadCfg(): Promise<ThreadCfg> {
    return await this.threadsCfgDBService.readThreadCfg(
      this.defaultThreadCfgName
    );
  }
}