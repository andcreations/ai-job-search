import * as colors from 'ansi-colors';
import * as YAML from 'yaml';
import { Context } from '@ai-job-search/core';

import { Logger } from './Logger';
import { LogLevel } from '../types';

export class ConsoleLogger extends Logger {
  private LEVEL_TO_COLOR: Record<LogLevel, (str: string) => string> = {
    [LogLevel.DEBUG]: colors.gray,
    [LogLevel.INFO]: colors.white,
    [LogLevel.WARNING]: colors.yellow,
    [LogLevel.ERROR]: colors.red,
  };

  private color(str: string, color: (str: string) => string): string {
    return color(str);
  }

  private now(): string {
    return new Date().toISOString();
  }

  private toYAML(context: Context): string {
    const lines = YAML.stringify(context).split('\n');
    let yaml = '';
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      if (index === lines.length - 1 && line.length === 0) {
        continue;
      }

      if (index) {
        yaml += '\n';
      }
      yaml += '  ' + line;
    }
    return yaml;
  }  

  private log(level: LogLevel, msg: string, context: Context): void {
    const levelStr = this.color(level, this.LEVEL_TO_COLOR[level]);
    const contextStr = context
      ? `\n${this.color(this.toYAML(context), colors.gray)}`
      : '';
    console.log(`${this.now()} | ${levelStr} | ${msg}${contextStr}`);    
  }

  public debug(msg: string, context: Context): void {
    this.log(LogLevel.DEBUG, msg, context);
  }

  public info(msg: string, context: Context): void {
    this.log(LogLevel.INFO, msg, context);
  }

  public warning(msg: string, context: Context): void {
    this.log(LogLevel.WARNING, msg, context);
  }

  public error(msg: string, context: Context, error?: any): void {
    if (error && error instanceof Error) {
      this.log(LogLevel.ERROR, msg, {
        ...context,
        stack: error.stack,
        error: error.toString()
      });
      return;
    }
    this.log(LogLevel.ERROR, msg, {
      ...context,
      error: error?.toString() ?? 'Unknown error'
    });
  }
}