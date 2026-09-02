import { CM_TO_METER } from './constants.ts';

/**
 * Converts a length in "cm" to "meter".
 */
export function cm(lengthInCentimeter: number): number {
  return lengthInCentimeter * CM_TO_METER;
}
