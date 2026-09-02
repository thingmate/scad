import { serializeNumbersList } from '../../numbers-list/serialize/serialize-numbers-list.ts';
import type { Vector3d } from '../vector-3d.ts';

/**
 * Serializes a 3D vector into a string representation (open-scad format).
 *
 * @param {Vector3d} input - The Vector3d object containing three numerical components (x, y, z).
 * @return {string} A string representation of the vector in a serialized format.
 */
export function serializeVector3d(input: Vector3d): string {
  return serializeNumbersList(input);
}
