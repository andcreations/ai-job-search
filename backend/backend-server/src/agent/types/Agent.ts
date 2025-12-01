import { AgentCfg } from './AgentCfg';
import { AgentInvokeInput } from './AgentInvokeInput';
import { AgentInvokeOutput } from './AgentInvokeOutput';
import { AgentStreamInput } from './AgentStreamInput';

export abstract class Agent {
  protected constructor(
    private readonly name: string,
  ) {}

  public getName(): string {
    return this.name;
  }

  public abstract init(agentCfg: AgentCfg): Promise<void>;

  public abstract invoke(input: AgentInvokeInput): Promise<AgentInvokeOutput>;

  public abstract stream(input: AgentStreamInput): Promise<void>;
}