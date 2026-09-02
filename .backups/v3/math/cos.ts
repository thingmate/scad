import { TURN_TO_RAD } from './units/angle/constants.ts';

/**
 * Calculates the cosine of the given angle in turns.
 *
 * @param {number} turns - The angle in turns for which to calculate the cosine.
 * @return {number} The cosine of the specified angle.
 */
export function cos(turns: number): number {
  return Math.cos(turns * TURN_TO_RAD);
}
