import { Lines } from '../../../src/misc/lines/lines.ts';
import { IVector3D } from '../../../src/tree/shared/types/vector-3d.ts';

const OUT_PATH = './dist/debug.scad';


/*--------------*/


export abstract class Model {
}


export abstract class Cube extends Model {
  readonly size: IVector3D;

  constructor(
    size: IVector3D,
  ) {
    super();
    this.size = size;
  }

  center(): any {

  }

  toString(): string {
    return ''; // TODO
  }
}


/*--------------*/

export async function debugClassBased() {
  // const lines = color([1, 0, 0], [
  //   translate([8, 9, 0], [
  //     union([
  //       cube({ size: [1, 2, 30], center: true }),
  //       sphere({ radius: 10 }),
  //     ]),
  //   ]),
  // ]);

  // const lines = union([
  //   linearExtrude({
  //     height: 10,
  //     twist: deg(360),
  //     fragmentNumber: 100,
  //   }, [
  //     translate([2, 0, 0], [
  //       circle({ radius: 1 }),
  //     ]),
  //     translate([-2, 0, 0], [
  //       circle({ radius: 1 }),
  //     ]),
  //   ]),
  // ]);

  new Cube([1, 2, 3]);

  // const lines = aluminiumExtrusion20mm(cm(50));

  // const lines = union([
  //   modifier('background', screw1()),
  // ]);
  //
  // await exportToSCAD(OUT_PATH, lines);
}
