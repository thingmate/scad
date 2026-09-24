import { numberToOpenscad } from '../../../number/to/openscad/number-to-openscad.ts';
import type { NumberList } from '../../number-list.ts';

export function numberListToOpenscad(list: NumberList): string {
  return `[${list.map((item: number) => numberToOpenscad(item)).join(', ')}]`;
}
