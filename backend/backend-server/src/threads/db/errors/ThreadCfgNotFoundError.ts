import { HttpStatus } from '@nestjs/common';
import { AIJobSearchError } from '@ai-job-search/common';

export class ThreadCfgNotFoundError extends AIJobSearchError {
  public static readonly CODE = ThreadCfgNotFoundError.name;

  public constructor(name: string) {
    super(
      `Thread configuration ${AIJobSearchError.quote(name)} not found`,
      ThreadCfgNotFoundError.CODE,
      HttpStatus.NOT_FOUND,
    );
  }
}