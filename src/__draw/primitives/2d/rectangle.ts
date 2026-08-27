import { Lines } from '../../../misc/lines/lines.ts';
import { transpileBoolean } from '../../../open-scad/transpile/transpile-boolean.ts';
import { serializeFunctionCall } from '../../../ast/base/function/call/serialize/serialize-function-call.ts';
import { transpileNumber } from '../../../open-scad/transpile/transpile-number.ts';
import { transpileVector2D } from '../../../open-scad/transpile/transpile-vector-2d.ts';
import { transpileVector3D } from '../../../open-scad/transpile/transpile-vector-3d.ts';
import { Vector2d } from '../../../tree/shared/types/vector-2d.ts';
import { Vector3d } from '../../../tree/shared/types/vector-3d.ts';
import { optionalFunctionArgument } from '../../../ast/base/function/argument/argument/optional-function-argument.ts';

export interface RectangleOptions {
  readonly size: Vector2d;
  readonly center?: boolean;
}

/**
 * Creates a rectangle.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#square
 */
export function rectangle({ size, center }: RectangleOptions): Lines {
  return serializeFunctionCall('square', [
    ['size', [transpileVector2D(size)]],
    ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
  ]);
}
