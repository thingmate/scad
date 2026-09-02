import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { polyfill } from './polyfill.ts';
import { houseProject } from './projects/house/house.project.ts';

polyfill();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const DIST = join(ROOT, 'dist');

async function main() {
  await houseProject();
}

await main();
