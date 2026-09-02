import { Vector2d } from '../../../tree/shared/types/vector-2d.ts';

/**
 * Calculates the area of a rectangle from the given dimensions.
 *
 * @param {[number, number]} Vector2d A tuple representing the width (x) and height (y) of the rectangle.
 * @return {number} The calculated area of the rectangle.
 */
export function area(
  [x, y]: Vector2d,
): number {
  return x * y;
}
