import { CM_TO_MM } from './cm-to-mm.ts';

/**
 * Converts a length in "cm" to "mm".
 */
export function cm(
  lengthInCentimeter: number,
): number {
  return lengthInCentimeter * CM_TO_MM;
}
