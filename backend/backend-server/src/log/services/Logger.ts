import { Context } from '@ai-job-search/core';

export abstract class Logger {
  abstract debug(msg: string, context: Context): void;

  abstract info(msg: string, context: Context): void;

  abstract warning(msg: string, context: Context): void;

  abstract error(msg: string, context: Context, error?: any): void;  
}