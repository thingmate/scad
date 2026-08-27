import { ReadonlyVec2 } from 'gl-matrix';
import { rotatePath2D } from '../../../../../../path-2d/operations/transform/rotate-path-2d';
import { IPCBCopper } from '../../open-scad-model.type.ts';

export function rotatePCBCopper(
  copper: IPCBCopper,
  rotation: number,
  around: ReadonlyVec2,
): IPCBCopper {
  rotatePath2D(copper.path, rotation, around);
  return copper;
}
