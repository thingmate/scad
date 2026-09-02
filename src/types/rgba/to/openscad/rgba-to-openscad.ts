import { numberToOpenscad } from '../../../number/to/openscad/number-to-openscad.ts';
import type { Rgba } from '../../rgba.ts';

export function rgbaToOpenscad([r, g, b, a]: Rgba): string {
  return `[${numberToOpenscad(r)}, ${numberToOpenscad(g)}, ${numberToOpenscad(b)}${a === undefined ? '' : `, ${numberToOpenscad(a)}`}]`;
}
