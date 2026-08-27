import { ReadonlyVec2 } from 'gl-matrix';
import { translatePath2D } from '../../../../../../path-2d/operations/transform/translate-path-2d';
import { IPCBCopper } from '../../open-scad-model.type.ts';

export function translatePCBCopper(
  copper: IPCBCopper,
  translation: ReadonlyVec2,
): IPCBCopper {
  translatePath2D(copper.path, translation);
  return copper;
}
