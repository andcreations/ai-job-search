import { PasswordUtils } from '../utils';

if (process.argv.length < 3) {
  console.error('Re-run with arguments: [password]');
  process.exit(1);
}

const password = process.argv[2];
const hash = PasswordUtils.hash(password);
console.log(`${password} -> ${hash}`);