import { OPEN_SCAD_MODEL } from '../scad-part-type.enum.ts';
import { IPCBPart } from '../scad-part.type.ts';
import { IOpenSCADModel } from './open-scad-model.type.ts';

export function isOpenSCADModel(
  value: IPCBPart,
): value is IOpenSCADModel {
  return (value.type === OPEN_SCAD_MODEL);
}

