import { Lines } from '../../misc/lines/lines.ts';
import { transpileBoolean } from '../../open-scad/transpile/transpile-boolean.ts';
import { transpileFunctionBlockMulti } from '../../ast/base/function/block/serialize/serialize-function-block.ts';
import { transpileNumber } from '../../open-scad/transpile/transpile-number.ts';
import { transpileVector3D } from '../../open-scad/transpile/transpile-vector-3d.ts';
import { Vector3d } from '../../tree/shared/types/vector-3d.ts';
import { optionalFunctionArgument } from '../../ast/base/function/argument/argument/optional-function-argument.ts';

export interface Offset2dOptions {
  readonly radius?: number;
  readonly delta?: number;
  readonly chamfer?: boolean;
}

/**
 * Applies an "offset" transformation (in 2d) on a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#offset
 */
export function offset2d(
  { radius, delta, chamfer }: Offset2dOptions,
  expressions: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'offset',
    [
      ...optionalFunctionArgument(radius, (radius) => ['radius', [transpileNumber(radius)]]),
      ...optionalFunctionArgument(delta, (delta) => ['delta', [transpileNumber(delta)]]),
      ...optionalFunctionArgument(chamfer, (chamfer) => ['chamfer', [transpileBoolean(chamfer)]]),
    ],
    expressions,
  );
}
