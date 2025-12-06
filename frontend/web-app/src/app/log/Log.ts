export class Log {
  private static log(level: string, msg: string): void {
    console.log(`[${level}] | ${msg}`);
  }
  
  public static debug(msg: string): void {
    this.log('DBUG', msg);
  }

  public static info(msg: string): void {
    this.log('INFO', msg);
  }

  public static warning(msg: string): void {
    this.log('WARN', msg);
  }

  public static error(msg: string, error?: any): void {
    let fullMsg = msg;
    if (error) {
      if (error instanceof Error) {
        fullMsg += `\n${error.stack}`;
      } else {
        fullMsg += `\n${error.toString()}`;
      }
    }
    this.log('EROR', fullMsg);
  }
}