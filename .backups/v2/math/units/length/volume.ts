import { Vector3d } from '../../../tree/shared/types/vector-3d.ts';

/**
 * Calculates the volume of a rectangular prism given its dimensions.
 *
 * @param {Vector3d} dimensions - An array containing the three dimensions [x, y, z],
 * where x is the length, y is the width, and z is the height of the prism.
 * @return {number} The calculated volume of the rectangular prism.
 */
export function volume(
  [x, y, z]: Vector3d,
): number {
  return x * y * z;
}
