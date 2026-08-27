import { mirrorPath2D } from '../../../../../../path-2d/operations/transform/mirror-path-2d';
import { IPCBCopper } from '../../open-scad-model.type.ts';

export function mirrorPCBCopper(
  copper: IPCBCopper,
  around: number,
): IPCBCopper {
  mirrorPath2D(copper.path, around);
  return copper;
}
