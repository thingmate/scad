import { ScrewPhillipsPanHeadOptions } from './screw-phillips-pan-head.ts';
import { diameter } from '../../../../../math/units/length/circle/diameter.ts';

export const PHILLIPS_PAN_HEAD_M3: ScrewPhillipsPanHeadOptions = {
  radius: diameter(5.2),
  height: 1.7,
};

export const PHILLIPS_PAN_HEAD_M4: ScrewPhillipsPanHeadOptions = {
  radius: diameter(6.6),
  height: 2.2,
};
