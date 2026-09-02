import { Lines } from '../../../../../misc/lines/lines.ts';
import { cylinder, CylinderOptions } from '../../../../open-scad/build/primitives/3d/cylinder.ts';
import { screwBody } from '../../body/screw-body.ts';
import { ScrewWasherExternalOptions } from '../../washer/screw-washer.ts';
import { cos } from '../../../../../math/cos.ts';
import { difference } from '../../../../open-scad/build/modeling/difference.ts';

export function getRealScrewHexNutRadius(
  radius: number,
): number {
  return radius / cos(30);
}

export interface ScrewNutExternalOptions extends Pick<CylinderOptions, 'height' | 'radius'> {

}

export function screwHexNutExternal(
  {
    radius,
    ...options
  }: ScrewWasherExternalOptions,
): Lines {
  return cylinder({
    ...options,
    radius: getRealScrewHexNutRadius(radius),
    fragmentNumber: 6,
    center: true,
  });
}

export interface ScrewHeyNutOptions extends Pick<ScrewNutExternalOptions, 'height'> {
  readonly externalRadius: number;
  readonly internalRadius: number;
}

export function screwHexNut(
  {
    externalRadius,
    internalRadius,
    ...options
  }: ScrewHeyNutOptions,
): Lines {
  return difference([
    screwHexNutExternal({
      ...options,
      radius: externalRadius,
    }),
    screwBody({
      ...options,
      radius: internalRadius,
    }),
  ]);
}
