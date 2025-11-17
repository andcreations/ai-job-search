import * as path from 'path';
import * as fs from 'fs';
import { requireStrEnv } from '@ai-job-search/common';

export class SQLiteUtils {
  private static getSQLiteDBDir(): string {
    return requireStrEnv('SQLITE_DB_DIR');
  }

  public static getSQLiteDBFilePath(dbName: string): string {
    return path.join(this.getSQLiteDBDir(), `${dbName}.sqlite3`);
  }

  public static getSQLiteMigrationsDir(dbName: string): string {
    const dir = path.resolve(path.join('./migrations', dbName));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }
}