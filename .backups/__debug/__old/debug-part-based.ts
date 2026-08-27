import { Lines } from '../../../src/misc/lines/lines.ts';
import { createOpenSCADCube } from '../../__part-based/part/individual/open-scad-model/primitives/3d/cube.ts';
import { ISCADProject } from '../../__part-based/project/scad-project.type.ts';
import { IVector3D } from '../../../src/tree/shared/types/vector-3d.ts';

const OUT_PATH = './dist/debug.scad';


/*--------------*/


/*--------------*/

export async function debugPartBased() {
  const project: ISCADProject = {
    name: 'abc',
    parts: [
      createOpenSCADCube({
        size: [1, 2, 3],
      }),
    ],
  };
}
