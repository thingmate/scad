import { Lines } from '../../misc/lines/lines.ts';
import { inlineLastLines } from '../../misc/lines/functions/after-last-line.ts';
import { ModifierType, toOpenSCADModifier } from './modifier-type.ts';

/**
 * Defines a "modifier" to apply to a block of code.
 */
export function modifier(
  modifier: ModifierType,
  lines: Lines,
): Lines {
  return inlineLastLines(
    [toOpenSCADModifier(modifier)],
    lines,
  );
}
