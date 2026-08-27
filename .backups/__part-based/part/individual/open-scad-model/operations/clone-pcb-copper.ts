import { clonePath2D } from '../../../../../path-2d/operations/clone-path-2d';
import { createOpenScadModel } from '../create-open-scad-model.ts';
import { IPCBCopper } from '../open-scad-model.type.ts';

export function clonePCBCopper(
  copper: IPCBCopper,
): IPCBCopper {
  return createOpenScadModel(copper.layer, clonePath2D(copper.path));
}
