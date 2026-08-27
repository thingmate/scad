import { Lines } from '../../misc/lines/lines.ts';
import { modifier } from './modifier.ts';

export function debug(
  lines: Lines,
): Lines {
  return modifier('debug', lines);
}
