import { booleanToOpenscad } from '../../../../types/boolean/to/openscad/boolean-to-openscad.ts';
import { vector3ToOpenscad } from '../../../../types/vector-3/to/openscad/vector-3-to-openscad.ts';
import { Shape3d } from '../../shape-3d.ts';

export class Cube extends Shape3d {
  static cube(size: number): Cube {
    return new Cube(size, size, size);
  }

  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly center: boolean;

  constructor(x: number, y: number, z: number, center: boolean = true) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
    this.center = center;
  }

  /**
   * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cube
   */
  override toOpenscad(): string {
    return super.toOpenscad(
      `cube(size = ${vector3ToOpenscad([this.x, this.y, this.z])}, center = ${booleanToOpenscad(this.center)});`,
    );
  }
}

/*--*/

export function cube(x: number, y: number, z: number, center?: boolean): Cube {
  return new Cube(x, y, z, center);
}
