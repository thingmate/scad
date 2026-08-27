import { Lines } from '../../misc/lines/lines.ts';
import { transpileFunctionBlockMulti } from '../../ast/base/function/block/serialize/serialize-function-block.ts';
import { transpileVector3D } from '../../open-scad/transpile/transpile-vector-3d.ts';
import { Vector3d } from '../../tree/shared/types/vector-3d.ts';

/**
 * Applies a "scale" transformation on a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#scale
 */
export function scale(vector: Vector3d, expressions: readonly Lines[]): Lines {
  return transpileFunctionBlockMulti('scale', [['v', [transpileVector3D(vector)]]], expressions);
}
