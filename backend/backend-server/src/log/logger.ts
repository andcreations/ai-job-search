import { Logger, ConsoleLogger } from './services';

let logger: Logger;

export function getLogger(): Logger {
  if (!logger) {
    logger = new ConsoleLogger();
  }
  return logger;
}
