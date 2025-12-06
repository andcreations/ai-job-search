import { HttpStatus } from '@nestjs/common';
import { AIJobSearchError } from './AIJobSearchError';

export class InternalServerError extends AIJobSearchError {
  public static readonly CODE = InternalServerError.name;

  public constructor(message: string) {
    super(message, InternalServerError.CODE, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}