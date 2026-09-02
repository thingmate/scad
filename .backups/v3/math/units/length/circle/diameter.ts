import { DIAMETER_TO_RADIUS } from './constants.ts';

/**
 * Converts the given diameter to radius.
 *
 * @param {number} diameter - The input value representing the diameter.
 * @return {number} The calculated radius.
 */
export function diameter(diameter: number): number {
  return diameter * DIAMETER_TO_RADIUS;
}
