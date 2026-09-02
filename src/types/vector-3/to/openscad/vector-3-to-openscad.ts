import { numberToOpenscad } from '../../../number/to/openscad/number-to-openscad.ts';
import type { Vector3 } from '../../vector-3.ts';

export function vector3ToOpenscad([a, b, c]: Vector3): string {
  return `[${numberToOpenscad(a)}, ${numberToOpenscad(b)}, ${numberToOpenscad(c)}]`;
}
