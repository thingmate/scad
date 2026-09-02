import { RAD_TO_DEG } from './deg-to-rad.ts';


/**
 * Converts the given angle from radians to degrees.
 *
 * @param {number} angleInRadians - The angle in radians to be converted.
 * @return {number} The angle converted to degrees.
 */
export function rad(
  angleInRadians: number,
): number {
  return angleInRadians * RAD_TO_DEG;
}
