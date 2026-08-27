import { cube } from '../../../ast/nodes/shapes/3d/cube/cube.ts';
import type { Rgba } from '../../../ast/nodes/base/color/rgba.ts';
import { color } from '../../../ast/nodes/transformations/color/color.ts';
import { EPSILON_FACTOR } from '../../../math/epsilon.ts';
import { CONCRETE_MATERIAL } from '../../materials/concrete.ts';
import { translate } from '../../../ast/nodes/transformations/translate/translate.ts';

export interface WallOpeningOptions {
  readonly length: number;
  readonly thickness: number;
  readonly height: number;
  readonly material?: Rgba;
}

export function wallOpening({
  length,
  thickness,
  height,
  material = CONCRETE_MATERIAL,
}: WallOpeningOptions) {
  return color(material, [
    translate(
      [0, 0, height / 2],
      [
        cube({
          size: [length, thickness * EPSILON_FACTOR, height],
          center: true,
        }),
      ],
    ),
  ]);
}
