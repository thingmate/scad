import { M_TO_MM } from './cm-to-mm.ts';

/**
 * Converts a length in "meter" to "mm".
 */
export function meter(
  lengthInMeter: number,
): number {
  return lengthInMeter * M_TO_MM;
}

