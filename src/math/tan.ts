import { DEG_TO_RAD } from './units/angle/deg-to-rad.ts';

/**
 * Calculates the tangent of an angle provided in degrees.
 *
 * @param {number} deg - The angle in degrees for which to calculate the tangent.
 * @return {number} The tangent of the given angle.
 */
export function tan(
  deg: number,
): number {
  return Math.tan(deg * DEG_TO_RAD);
}
