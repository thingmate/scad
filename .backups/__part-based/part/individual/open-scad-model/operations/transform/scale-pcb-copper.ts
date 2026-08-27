import { ReadonlyVec2 } from 'gl-matrix';
import { scalePath2D } from '../../../../../../path-2d/operations/transform/scale-path-2d';
import { IPCBCopper } from '../../open-scad-model.type.ts';

export function scalePCBCopper(
  copper: IPCBCopper,
  scaling: number,
  around: ReadonlyVec2,
): IPCBCopper {
  scalePath2D(copper.path, scaling, around);
  return copper;
}
