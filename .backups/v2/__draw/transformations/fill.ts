import { Lines } from '../../misc/lines/lines.ts';
import { transpileFunctionBlockMulti } from '../../ast/base/function/block/serialize/serialize-function-block.ts';

/**
 * Applies a "fill" transformation on a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#fill
 */
export function fill(expressions: readonly Lines[]): Lines {
  return transpileFunctionBlockMulti('fill', [], expressions);
}
