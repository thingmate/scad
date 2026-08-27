import { Lines } from '../../misc/lines/lines.ts';
import { transpileBoolean } from '../../open-scad/transpile/transpile-boolean.ts';
import { transpileFunctionBlockMulti } from '../../ast/base/function/block/serialize/serialize-function-block.ts';
import { transpileNumber } from '../../open-scad/transpile/transpile-number.ts';
import { transpileVector3D } from '../../open-scad/transpile/transpile-vector-3d.ts';
import { Vector3d } from '../../tree/shared/types/vector-3d.ts';
import { optionalFunctionArgument } from '../../ast/base/function/argument/argument/optional-function-argument.ts';

// linear_extrude(height = 5, center = true, convexity = 10, twist = -fanrot, slices = 20, scale = 1.0, $fn = 16)

export interface LinearExtrudeOptions {
  readonly height: number;
  readonly center?: boolean;
  readonly convexity?: number;
  readonly twist?: number;
  readonly slices?: number;
  readonly scale?: number;
  readonly fragmentNumber?: number;
}

/**
 * Applies a "linear-extrude" transformation on a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#linear_extrude
 */
export function linearExtrude(
  {
    height,
    center = false,
    convexity = 10,
    twist = 0,
    slices,
    scale,
    fragmentNumber,
  }: LinearExtrudeOptions,
  expressions: Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'linear_extrude',
    [
      ['height', [transpileNumber(height)]],
      ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
      ['convexity', [transpileNumber(convexity)]],
      ['twist', [transpileNumber(twist)]],
      ...optionalFunctionArgument(slices, (slices) => ['slices', [transpileNumber(slices)]]),
      ...optionalFunctionArgument(scale, (scale) => ['scale', [transpileNumber(scale)]]),
      ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => [
        '$fn',
        [transpileNumber(fragmentNumber)],
      ]),
    ],
    expressions,
  );
}
