import { Lines } from '../../misc/lines/lines.ts';
import { modifier } from './modifier.ts';

export function root(
  lines: Lines,
): Lines {
  return modifier('root', lines);
}
