import { numberToOpenscad } from '../../../number/to/openscad/number-to-openscad.ts';
import type { Vector2 } from '../../vector-2.ts';

export function vector2ToOpenscad([a, b]: Vector2): string {
  return `[${numberToOpenscad(a)}, ${numberToOpenscad(b)}]`;
}
