import { ILayer } from '../../../../shared/layers/layers';
import { IPCBCopper } from '../open-scad-model.type.ts';

export function changeLayerOfPCBCopper(
  copper: IPCBCopper,
  layer: ILayer,
): IPCBCopper {
  copper.layer = layer;
  return copper;
}
