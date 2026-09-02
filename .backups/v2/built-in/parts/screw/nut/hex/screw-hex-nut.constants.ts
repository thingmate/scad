import { ScrewNutExternalOptions } from './screw-hex-nut.ts';
import { diameter } from '../../../../../math/units/length/circle/diameter.ts';

// https://www.engineersedge.com/hardware/standard_metric_hex_nuts_13728.htm
// https://www.engineersedge.com/hardware/metric_hex_nuts_14056.htm

export const HEX_NUT_M1: ScrewNutExternalOptions = {
  radius: diameter(2.5),
  height: 1.2,
};

export const HEX_NUT_M1_6: ScrewNutExternalOptions = {
  radius: diameter(3.2),
  height: 1.3,
};

export const HEX_NUT_M2: ScrewNutExternalOptions = {
  radius: diameter(4),
  height: 1.6,
};

export const HEX_NUT_M2_5: ScrewNutExternalOptions = {
  radius: diameter(5),
  height: 2.0,
};

export const HEX_NUT_M3: ScrewNutExternalOptions = {
  radius: diameter(5.5),
  height: 2.4,
};

export const HEX_NUT_M3_SELF_LOCK: ScrewNutExternalOptions = {
  ...HEX_NUT_M3,
  height: 4.0,
};

export const HEX_NUT_M4: ScrewNutExternalOptions = {
  radius: diameter(7.0),
  height: 3.2,
};

export const HEX_NUT_M5: ScrewNutExternalOptions = {
  radius: diameter(8.0),
  height: 4.7,
};

export const HEX_NUT_M6: ScrewNutExternalOptions = {
  radius: diameter(10.0),
  height: 5.2,
};

export const HEX_NUT_M8: ScrewNutExternalOptions = {
  radius: diameter(13.0),
  height: 6.8,
};

export const HEX_NUT_M10: ScrewNutExternalOptions = {
  radius: diameter(16.0),
  height: 9.1,
};

export const HEX_NUT_M12: ScrewNutExternalOptions = {
  radius: diameter(18.0),
  height: 10.8,
};

