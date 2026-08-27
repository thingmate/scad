import { Lines } from '../../../../src/misc/lines/lines.ts';
import { color } from '../../../../src/open-scad/build/transformations/color.ts';
import { GRASS_MATERIAL } from '../../../../src/built-in/materials/grass.ts';
import { rectangle } from '../../../../src/open-scad/build/primitives/2d/rectangle.ts';
import { meter } from '../../../../src/math/units/length/meter.ts';


export function houseLand(): Lines {
  return color(GRASS_MATERIAL, [
    rectangle({ size: [meter(10), meter(15)], center: false }),
  ])
}
