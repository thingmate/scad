import { Lines } from '../../../src/misc/lines/lines.ts';
import { $fn } from '../../../src/open-scad/build/others/fn.ts';
import { cube } from '../../../src/open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../../src/open-scad/build/primitives/3d/cylinder.ts';
import { rotate } from '../../../src/open-scad/build/transformations/rotate.ts';
import { round3d } from '../../../src/open-scad/build/transformations/round-3d.ts';
import { translate } from '../../../src/open-scad/build/transformations/translate.ts';
import { Vector3d } from '../../../src/tree/shared/types/vector-3d.ts';
import { diameter } from '../../../src/math/units/length/circle/diameter.ts';
import { difference } from '../../../src/open-scad/build/modeling/difference.ts';
import { union } from '../../../src/open-scad/build/modeling/union.ts';

export interface ISofaTableFootOptions {
  footSize: Vector3d;
}

export function sofaTableFoot(
  {
    footSize,
  }: ISofaTableFootOptions,
): Lines {
  const height = footSize[2] - footSize[0];

  const roundEnd = () => {
    return rotate([90, 0, 0], [
      cylinder({
        radius: diameter(footSize[0]),
        height: footSize[1],
        center: true,
      }),
    ]);
  };

  return difference([
    union([
      $fn(4),
      round3d({ radius: 2 }, [
        roundEnd(),
        translate([0, 0, -(height / 2)], [
          cube({ size: [footSize[0], footSize[1], height], center: true }),
        ]),
      ]),
    ]),
    rotate([90, 0, 0], [
      cylinder({
        radius: diameter(3),
        height: 20,
        center: true,
      }),
    ]),
  ]);
}
