import { TURN_TO_RAD } from './units/angle/constants.ts';

/**
 * Calculates the tangent of an angle provided in turns.
 *
 * @param {number} turns - The angle in turns for which to calculate the tangent.
 * @return {number} The tangent of the given angle.
 */
export function tan(turns: number): number {
  return Math.tan(turns * TURN_TO_RAD);
}
