import { DEG_TO_RAD } from './units/angle/deg-to-rad.ts';

/**
 * Calculates the cosine of the given angle in degrees.
 *
 * @param {number} deg - The angle in degrees for which to calculate the cosine.
 * @return {number} The cosine of the specified angle.
 */
export function cos(
  deg: number,
): number {
  return Math.cos(deg * DEG_TO_RAD);
}
