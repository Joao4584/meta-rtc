// packages/env/index.ts
import * as dotenv from 'dotenv';
import { resolve } from 'path';

export function loadEnv() {
  dotenv.config({ path: resolve(process.cwd(), '../../.env') });
}
