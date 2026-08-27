import { serializeNumbersList } from '../../numbers-list/serialize/serialize-numbers-list.ts';
import type { Vector2d } from '../vector-2d.ts';

/**
 * Serializes a 2D vector into a string representation (open-scad format).
 *
 * @param {Vector2d} input - The Vector2d object containing two numerical components (x, y).
 * @return {string} A string representation of the vector in a serialized format.
 */
export function serializeVector2d(input: Vector2d): string {
  return serializeNumbersList(input);
}
