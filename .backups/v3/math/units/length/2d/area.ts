import type { Vector2 } from '../../../../types/vector-2/vector-2.ts';

/**
 * Calculates the area of a rectangle from the given dimensions.
 *
 * @param {Vector2} dimensions A tuple representing the width (x) and height (y) of the rectangle.
 * @return {number} The calculated area of the rectangle.
 */
export function area([x, y]: Vector2): number {
  return x * y;
}
