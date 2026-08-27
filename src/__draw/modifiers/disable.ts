import { Lines } from '../../misc/lines/lines.ts';
import { modifier } from './modifier.ts';

export function disable(
  lines: Lines,
): Lines {
  return modifier('disable', lines);
}
