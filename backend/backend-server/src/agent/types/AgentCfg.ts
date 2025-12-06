import { IsNotEmpty, IsString } from 'class-validator';

export class AgentCfg {
  // OpenAI, Anthropic, etc.
  @IsString()
  @IsNotEmpty()
  public name: string;

  // Model name
  @IsString()
  @IsNotEmpty()
  public model: string;
}