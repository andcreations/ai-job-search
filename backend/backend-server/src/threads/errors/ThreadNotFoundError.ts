import { HttpStatus } from '@nestjs/common';
import { AIJobSearchError } from '@ai-job-search/common';

export class ThreadNotFoundError extends AIJobSearchError {
  public static readonly CODE = ThreadNotFoundError.name;

  public constructor(threadId: string) {
    super(
      `Thread ${AIJobSearchError.quote(threadId)} not found`,
      ThreadNotFoundError.CODE,
      HttpStatus.NOT_FOUND,
    );
  }
}