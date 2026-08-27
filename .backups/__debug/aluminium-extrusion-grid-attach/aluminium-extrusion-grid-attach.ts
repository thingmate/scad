import { Lines } from '../../../src/misc/lines/lines.ts';
import { cube } from '../../../src/open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../../src/open-scad/build/primitives/3d/cylinder.ts';
import { translate } from '../../../src/open-scad/build/transformations/translate.ts';
import { difference } from '../../../src/open-scad/build/modeling/difference.ts';
import { union } from '../../../src/open-scad/build/modeling/union.ts';

export interface IAluminiumExtrusionGridAttachOptions {
  holesSpacing: number;
  holesRadius: number;
  xLength: number;
  yLength: number;
  zLength: number;
}

export function aluminiumExtrusionGridAttach(
  {
    holesSpacing,
    holesRadius,
    xLength,
    yLength,
    zLength,

  }: IAluminiumExtrusionGridAttachOptions,
): Lines {
  const extra: number = 1;
  return difference([
    cube({
      size: [xLength, yLength, zLength],
      center: true,
    }),
    union([
      translate([holesSpacing / 2, 0, 0], [
        cylinder({
          height: zLength + extra,
          radius: holesRadius,
          center: true,
        }),
      ]),
      translate([-holesSpacing / 2, 0, 0], [
        cylinder({
          height: zLength + extra,
          radius: holesRadius,
          center: true,
        }),
      ]),
    ]),
  ]);
}
