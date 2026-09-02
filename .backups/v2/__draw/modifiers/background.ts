import { Lines } from '../../misc/lines/lines.ts';
import { modifier } from './modifier.ts';

export function background(
  lines: Lines,
): Lines {
  return modifier('background', lines);
}
