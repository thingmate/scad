import { Lines } from '../../../../../src/misc/lines/lines.ts';
import { OPEN_SCAD_MODEL } from '../scad-part-type.enum.ts';
import { IOpenSCADModel } from './open-scad-model.type.ts';

export function createOpenSCADModel(
  lines: Lines,
): IOpenSCADModel {
  return {
    type: OPEN_SCAD_MODEL,
    lines,
  };
}
