import { Lines } from '../../../../misc/lines/lines.ts';
import { cylinder, CylinderOptions } from '../../../open-scad/build/primitives/3d/cylinder.ts';
import { screwBody } from '../body/screw-body.ts';
import { difference } from '../../../open-scad/build/modeling/difference.ts';

export interface ScrewWasherExternalOptions extends Pick<CylinderOptions, 'height' | 'radius'>{

}

export function screwWasherExternal(
  options: ScrewWasherExternalOptions,
): Lines {
  return cylinder({
    ...options,
    center: true,
  });
}


export interface ScrewWasherOptions extends Pick<ScrewWasherExternalOptions, 'height'>{
  readonly externalRadius: number;
  readonly internalRadius: number;
}

export function screwWasher(
  {
    externalRadius,
    internalRadius,
    ...options
  }: ScrewWasherOptions,
): Lines {
  return difference([
    screwWasherExternal({
      ...options,
      radius: externalRadius,
    }),
    screwBody({
      ...options,
      radius: internalRadius,
    }),
  ]);
}
