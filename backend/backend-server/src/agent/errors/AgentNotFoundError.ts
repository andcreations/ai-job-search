import { HttpStatus } from '@nestjs/common';
import { AIJobSearchError } from '@ai-job-search/common';

export class AgentNotFoundError extends AIJobSearchError {
  public static readonly CODE = AgentNotFoundError.name;

  public constructor(provider: string) {
    super(
      `Agent ${AgentNotFoundError.quote(provider)} not found`,
      AgentNotFoundError.CODE,
      HttpStatus.NOT_FOUND,
    );
  }
}