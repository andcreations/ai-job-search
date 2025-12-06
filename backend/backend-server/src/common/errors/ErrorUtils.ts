import { AIJobSearchError } from './AIJobSearchError';

export class ErrorUtils {
  public static errorToString(error: any): string {
    if (error instanceof AIJobSearchError) {
      return error.toString();
    }
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Unknown error';
  }
}