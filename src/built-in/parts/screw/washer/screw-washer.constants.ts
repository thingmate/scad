import { ScrewWasherExternalOptions } from './screw-washer.ts';
import { diameter } from '../../../../math/units/length/circle/diameter.ts';

export const WASHER_M3: ScrewWasherExternalOptions = {
  radius: diameter(7.0),
  height: 0.5,
};
