import { Lines } from '../../misc/lines/lines.ts';

/**
 * Groups a list of lines.
 */
export function group(
  lines: readonly Lines[],
): Lines {
  return lines.flat();
}
