import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { AgentCfg } from '@ai-job-search/agent';

export class ThreadCfg {
  @IsDefined()
  @ValidateNested()
  @Type(() => AgentCfg)
  public agent: AgentCfg;
}