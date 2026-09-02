import { MM_TO_METER } from './constants.ts';

/**
 * Converts a length in "mm" to "meter".
 */
export function mm(lengthInMilliMeter: number): number {
  return lengthInMilliMeter * MM_TO_METER;
}
