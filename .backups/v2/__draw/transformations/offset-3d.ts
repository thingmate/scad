import { Lines } from '../../misc/lines/lines.ts';
import { transpileBoolean } from '../../open-scad/transpile/transpile-boolean.ts';
import { transpileFunctionBlockMulti } from '../../ast/base/function/block/serialize/serialize-function-block.ts';
import { transpileNumber } from '../../open-scad/transpile/transpile-number.ts';
import { transpileVector3D } from '../../open-scad/transpile/transpile-vector-3d.ts';
import { difference } from '../modeling/difference.ts';
import { union } from '../modeling/union.ts';
import { cube } from '../primitives/3d/cube.ts';
import { sphere } from '../primitives/3d/sphere.ts';
import { Vector3d } from '../../tree/shared/types/vector-3d.ts';
import { minkowski } from './minkowski.ts';
import { optionalFunctionArgument } from '../../ast/base/function/argument/argument/optional-function-argument.ts';

export interface Offset3dOptions {
  readonly radius: number;
  readonly chamferBase?: boolean;
}

/**
 * Applies an "offset" transformation (in 3d) on a block of code.
 *
 * @experimental
 * @inheritDoc https://github.com/nophead/NopSCADlib/blob/master/utils/offset.scad
 */
export function offset3d(
  { radius, chamferBase = false }: Offset3dOptions,
  expressions: Lines[],
): Lines {
  const ball = (radius: number): Lines => {
    if (chamferBase) {
      /*
       rotate_extrude()
                intersection() {
                    rotate(180)
                        teardrop(0, r);

                    translate([0, -r])
                        square([r, 2 * r]);
                }
       */
      throw 'TODO';
      // return [];
    } else {
      return sphere({
        radius,
      });
    }
  };

  if (radius > 0) {
    return minkowski([union(expressions), ball(radius)]);
  } else if (radius < 0) {
    // const side = Number.POSITIVE_INFINITY;
    const side = 1000;
    const halfSide = side / 2;

    return difference([
      cube({
        size: [halfSide, halfSide, halfSide],
        center: true,
      }),
      minkowski([
        difference([
          cube({
            size: [side, side, side],
            center: true,
          }),
          union(expressions),
        ]),
        ball(-radius),
      ]),
    ]);
  } else {
    return union(expressions);
  }
}
