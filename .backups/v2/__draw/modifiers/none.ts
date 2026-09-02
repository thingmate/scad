import { Lines } from '../../misc/lines/lines.ts';
import { modifier } from './modifier.ts';

export function none(
  lines: Lines,
): Lines {
  return modifier('none', lines);
}
