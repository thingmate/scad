import { EPSILON } from '../../../../../math/epsilon.ts';
import { cm } from '../../../../../math/units/length/1d/cm.ts';
import { Material } from '../../../../../scene/material.ts';
import { Part } from '../../../../../scene/part.ts';
import { Shape } from '../../../../../scene/shape.ts';
import { COLOR_GLASS } from '../../../../../types/rgba/built-in/glass.ts';
import { COLOR_WHITE_PVC } from '../../../../../types/rgba/built-in/white-pvc.ts';

export function part_window(width: number, height: number, thickness: number): Part {
  const pvcThickness: number = cm(10);

  const glassWidth: number = width - pvcThickness * 2;
  const glassHeight: number = height - pvcThickness * 2;
  const glassThickness: number = thickness - cm(2);

  return new Part({
    name: `window_${width}x${height}x${thickness}`,
    parts: [
      new Part({
        name: 'glass',
        shape: Shape.cube(glassWidth, glassThickness, glassHeight),
        material: new Material({
          color: COLOR_GLASS,
        }),
      }),
      new Part({
        name: 'pvc',
        shape: Shape.cube(width, thickness, height).difference(
          Shape.cube(glassWidth, thickness + EPSILON, glassHeight),
        ),
        material: new Material({
          color: COLOR_WHITE_PVC,
        }),
      }),
    ],
    material: new Material({
      shopUrl: 'https://www.etsy.com/listing/1240222222/wooden-beam-80x60-with-wood-frame',
    }),
  });
}
