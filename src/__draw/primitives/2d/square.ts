import { Lines } from '../../../misc/lines/lines.ts';
import { RectangleOptions, rectangle } from './rectangle.ts';

export interface SquareOptions extends Omit<RectangleOptions, 'size'> {
  readonly size: number;
}

/**
 * Creates a square.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#square
 */
export function square(
  {
    size,
    ...options
  }: SquareOptions,
): Lines {
  return rectangle({
    ...options,
    size: [size, size],
  });
}
