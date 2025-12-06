import { ObjectValidationError } from './ObjectValidationError';

export class InvalidObjectError extends Error {
  public constructor(
    errorMessage: string,
    errors?: ObjectValidationError[],
  ) {
    super(errorMessage + InvalidObjectError.messageFromErrors(errors));
  }

  private static messageFromErrors(errors?: ObjectValidationError[]): string {
    if (!errors) {
      return '';
    }
    return '\n' + errors
      .map((error) => `${error.property}: ${error.error}`)
      .join('\n');
  }  
}