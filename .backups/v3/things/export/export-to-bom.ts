import { writeTextFileSafe } from '../../misc/file/write-text-file-safe.ts';
import type { Thing } from '../thing.ts';

export function exportToBOM(path: string, thing: Thing): Promise<void> {
  return writeTextFileSafe(path, thing.toBOM().toCSV());
}
