import { Lines } from '../../../../misc/lines/lines.ts';
import { cylinder, CylinderOptions } from '../../../open-scad/build/primitives/3d/cylinder.ts';

export interface ScrewBodyOptions extends Pick<CylinderOptions, 'height' | 'radius'>{

}

export function screwBody(
  options: ScrewBodyOptions,
): Lines {
  return cylinder({
    ...options,
    fragmentNumber: 30,
    center: true,
  });
}
