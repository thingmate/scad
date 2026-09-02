import { Lines } from '../../../../../misc/lines/lines.ts';
import { cube } from '../../../../open-scad/build/primitives/3d/cube.ts';
import { translate } from '../../../../open-scad/build/transformations/translate.ts';
import { ScrewNutExternalOptions, screwHexNutExternal } from './screw-hex-nut.ts';
import { union } from '../../../../open-scad/build/modeling/union.ts';

export interface ScrewHeyNutSideInsertOptions extends ScrewNutExternalOptions {
  readonly insertLength: number;
}

export function screwHexNutSideInsert(
  {
    radius,
    height,
    insertLength,
    ...options
  }: ScrewHeyNutSideInsertOptions,
): Lines {
  return union([
    screwHexNutExternal({
      ...options,
      radius,
      height,
    }),
    translate([insertLength * 0.5, 0, 0], [
      cube({
        size: [insertLength, radius * 2, height],
        center: true,
      }),
    ]),
  ]);
}
