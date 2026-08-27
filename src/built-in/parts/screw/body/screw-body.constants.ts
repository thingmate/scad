import { ScrewBodyOptions } from './screw-body.ts';
import { diameter } from '../../../../math/units/length/circle/diameter.ts';

export type PartialScrewBodyOptions = Pick<ScrewBodyOptions, 'radius'>;

export const SCREW_M3: PartialScrewBodyOptions = {
  radius: diameter(3),
};

export const SCREW_M4: PartialScrewBodyOptions = {
  radius: diameter(4),
};

