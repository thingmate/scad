import { TURN_TO_RAD } from './units/angle/constants.ts';

/**
 * Calculates the sine of an angle given in turns.
 *
 * @param {number} turns - The angle in turns for which to calculate the sine.
 * @return {number} The sine of the given angle.
 */
export function sin(turns: number): number {
  return Math.sin(turns * TURN_TO_RAD);
}
