import { DEG_TO_TURN } from './constants.ts';

/**
 * Converts the given angle from degrees to turns.
 *
 * @param {number} angleInDegrees - The angle in degrees to be converted.
 * @return {number} The converted value in turns.
 */
export function deg(angleInDegrees: number): number {
  return angleInDegrees * DEG_TO_TURN;
}
