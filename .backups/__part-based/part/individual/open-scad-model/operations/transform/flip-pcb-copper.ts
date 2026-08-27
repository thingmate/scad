import { mirrorPath2D } from '../../../../../../path-2d/operations/transform/mirror-path-2d';
import { getFlippedLayer } from '../../../../../shared/layers/layers';
import { IPCBCopper } from '../../open-scad-model.type.ts';
import { changeLayerOfPCBCopper } from '../change-layer-of-pcb-copper.ts';

export function flipPCBCopper(
  copper: IPCBCopper,
  around: number,
): IPCBCopper {
  mirrorPath2D(copper.path, around);
  changeLayerOfPCBCopper(copper, getFlippedLayer(copper.layer));
  return copper;
}
