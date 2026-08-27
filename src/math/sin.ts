import { DEG_TO_RAD } from './units/angle/deg-to-rad.ts';

/**
 * Calculates the sine of an angle given in degrees.
 *
 * @param {number} deg - The angle in degrees for which to calculate the sine.
 * @return {number} The sine of the given angle.
 */
export function sin(
  deg: number,
): number {
  return Math.sin(deg * DEG_TO_RAD);
}
