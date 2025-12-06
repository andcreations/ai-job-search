import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import * as crypto from 'crypto';

import { Agent, AgentCfg } from '../types';
import { AgentNotFoundError } from '../errors';
import { AGENTS } from '../agents';

@Injectable()
export class AgentProvider {
  // The fingerprint of the agent configuration is the key.
  private readonly agents: Record<string, Agent> = {};

  public constructor(
    private readonly moduleRef: ModuleRef,
  ) {}

  public hasAgent(name: string): boolean {
    return Object.keys(AGENTS).includes(name);
  }

  public async getAgent(agentCfg: AgentCfg): Promise<Agent> {
    const fingerprint = this.getAgentCfgFingerprint(agentCfg);
    if (!this.agents[fingerprint]) {
        const agentType = AGENTS[agentCfg.name];
      if (!agentType) {
        throw new AgentNotFoundError(agentCfg.name);
      }
      const agent = this.moduleRef.get(agentType);  
      await agent.init(agentCfg);
      this.agents[fingerprint] = agent;
    }
    return this.agents[fingerprint];
  }

  private getAgentCfgFingerprint(agentCfg: AgentCfg): string {
    const str = JSON.stringify(agentCfg);
    return crypto.createHash('md5').update(str).digest('hex');
  }
}