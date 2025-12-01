import { HttpStatus } from '@nestjs/common';
import { AIJobSearchError } from '../../common';

export class InvalidThreadCfgError extends AIJobSearchError {
  public static readonly CODE = InvalidThreadCfgError.name;

  public constructor(message: string) {
    super(InvalidThreadCfgError.CODE, message, HttpStatus.BAD_REQUEST);
  }
}