import { vector3ToOpenscad } from '../../../../types/vector-3/to/openscad/vector-3-to-openscad.ts';
import type { Vector3 } from '../../../../types/vector-3/vector-3.ts';
import { Shape3d } from '../../shape-3d.ts';

export class Polyhedron extends Shape3d {
  readonly points: readonly Vector3[];
  readonly faces: readonly number[];

  constructor(points: readonly Vector3[], faces: readonly number[]) {
    super();
    this.points = points;
    this.faces = faces;
  }

  /**
   * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#polyhedron
   */
  override toOpenscad(): string {
    return super.toOpenscad(`polyhedron(polyhedron = ${this.points.map(vector3ToOpenscad)});`);
  }
}

/*--*/

export function polyhedron(points: readonly Vector3[], faces: readonly number[]): Polyhedron {
  return new Polyhedron(points, faces);
}
