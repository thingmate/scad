import { Lines } from '../../misc/lines/lines.ts';
import { transpileFunctionBlockMulti } from '../../ast/base/function/block/serialize/serialize-function-block.ts';

/**
 * Applies a "minkowski" transformation on a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#minkowski
 */
export function minkowski(expressions: readonly Lines[]): Lines {
  return transpileFunctionBlockMulti('minkowski', [], expressions);
}
