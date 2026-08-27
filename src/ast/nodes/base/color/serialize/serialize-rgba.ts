import { serializeNumber } from '../../number/serialize/serialize-number.ts';
import type { Rgba } from '../rgba.ts';

export function serializeRgba([r, g, b, a]: Rgba): string {
  return `[${serializeNumber(r)}, ${serializeNumber(g)}, ${serializeNumber(b)}${a === void 0 ? '' : `, ${serializeNumber(a)}`}]`;
}
