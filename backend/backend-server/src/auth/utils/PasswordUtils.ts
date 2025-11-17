import * as bcrypt from 'bcryptjs';

export class PasswordUtils {
  public static hash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  public static verify(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}