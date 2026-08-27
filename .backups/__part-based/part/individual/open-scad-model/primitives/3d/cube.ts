import { cube, CubeOptions } from '../../../../../../../src/open-scad/build/primitives/3d/cube.ts';
import { ILines } from '../../../misc/lines/lines.type.ts';
import { createOpenSCADModel } from '../../create-open-scad-model.ts';

export function createOpenSCADCube(
  options: CubeOptions,
): ILines {
  return createOpenSCADModel(
    cube(options),
  );
}
