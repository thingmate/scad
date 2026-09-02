import { Lines } from '../../../misc/lines/lines.ts';
import { serializeFunctionCall } from '../../../ast/base/function/call/serialize/serialize-function-call.ts';
import { transpileNumber } from '../../../open-scad/transpile/transpile-number.ts';
import { transpileNumbersList } from '../../../open-scad/transpile/transpile-numbers-list.ts';
import { transpilePoints2DList } from '../../../open-scad/transpile/transpile-points-2d-list.ts';
import { NumbersList } from '../../../tree/shared/types/numbers-list.ts';
import { Points2dList } from '../../../tree/shared/types/points-2d-list.ts';
import { optionalFunctionArgument } from '../../../ast/base/function/argument/argument/optional-function-argument.ts';

export interface PolygonOptions {
  readonly points: Points2dList;
  readonly path?: readonly NumbersList[];
  readonly convexity?: number;
}

/**
 * Creates a polygon.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#polygon
 */
export function polygon({ points, path, convexity }: PolygonOptions): Lines {
  return serializeFunctionCall('polygon', [
    ['points', transpilePoints2DList(points)],
    ...optionalFunctionArgument(path, (path) => [
      'paths',
      [`[${path.map(transpileNumbersList).join(', ')}]`],
    ]),
    ...optionalFunctionArgument(convexity, (convexity) => [
      'convexity',
      [transpileNumber(convexity)],
    ]),
  ]);
}
