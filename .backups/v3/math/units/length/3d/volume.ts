import type { Vector3 } from '../../../../types/vector-3/vector-3.ts';

/**
 * Calculates the volume of a rectangular prism given its dimensions.
 *
 * @param {Vector3} dimensions - An array containing the three dimensions [x, y, z],
 * where x is the length, y is the width, and z is the height of the prism.
 * @return {number} The calculated volume of the rectangular prism.
 */
export function volume([x, y, z]: Vector3): number {
  return x * y * z;
}
