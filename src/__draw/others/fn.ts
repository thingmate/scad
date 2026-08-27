import { Lines } from '../../misc/lines/lines.ts';
import { transpileNumber } from '../../open-scad/transpile/transpile-number.ts';

/**
 * Sets the global "$fn" variable.
 */
export function $fn(
  value: number,
): Lines {
  return [
    `$fn = ${transpileNumber(value)};`,
  ];
}
