import { Lines } from '../../../../../misc/lines/lines.ts';
import { polygon } from '../../../../open-scad/build/primitives/2d/polygon.ts';
import { cylinder, CylinderOptions } from '../../../../open-scad/build/primitives/3d/cylinder.ts';
import { linearExtrude } from '../../../../open-scad/build/transformations/linear-extrude.ts';
import { rotate } from '../../../../open-scad/build/transformations/rotate.ts';
import { translate } from '../../../../open-scad/build/transformations/translate.ts';
import { difference } from '../../../../open-scad/build/modeling/difference.ts';
import { modifier } from '../../../../open-scad/build/modifiers/modifier.ts';
import { EPSILON } from '../../../../../math/epsilon.ts';

export interface ScrewPhillipsPanHeadOptions extends Pick<CylinderOptions, 'height' | 'radius'> {

}

export function screwPhillipsPanHead(
  options: ScrewPhillipsPanHeadOptions,
): Lines {
  const x: number = options.radius * 0.7;
  const y: number = options.radius * 0.2;
  const z: number = options.height * 0.8;

  const createHole = (): Lines => {
    return linearExtrude({
      height: y,
      center: true,
    }, [
      polygon({
        points: [
          -x, 0,
          +x, 0,
          0, z,
        ],
      }),
    ]);
  };

  return difference([
    cylinder({
      ...options,
      fragmentNumber: 30,
      center: true,
    }),
    modifier(
      'none',
      translate([0, 0, (options.height * 0.5) + EPSILON], [
        rotate([-90, 0, 0], [
          createHole(),
        ]),
        rotate([-90, 0, -90], [
          createHole(),
        ]),
      ]),
    ),
  ]);
}
