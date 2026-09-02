import { numberToOpenscad } from '../../../../types/number/to/openscad/number-to-openscad.ts';
import { Shape3d } from '../../shape-3d.ts';

export class Cone extends Shape3d {
  static cylinder(height: number, radius: number, subDivisions?: number): Cone {
    return new Cone(height, radius, radius, subDivisions);
  }

  readonly height: number;
  readonly radiusBottom: number;
  readonly radiusTop: number;
  readonly subDivisions: number;

  constructor(height: number, radiusBottom: number, radiusTop: number, subDivisions: number = 16) {
    super();
    this.height = height;
    this.radiusBottom = radiusBottom;
    this.radiusTop = radiusTop;
    this.subDivisions = subDivisions;
  }

  /**
   * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cylinder
   */
  override toOpenscad(): string {
    return super.toOpenscad(
      `cylinder(h = ${numberToOpenscad(this.height)}, r1 = ${numberToOpenscad(this.radiusBottom)}, r2 = ${numberToOpenscad(this.radiusTop)}, center = true, $fn = ${numberToOpenscad(this.subDivisions)});`,
    );
  }
}

/*--*/

export function cone(
  height: number,
  radiusBottom: number,
  radiusTop: number,
  subDivisions?: number,
): Cone {
  return new Cone(height, radiusBottom, radiusTop, subDivisions);
}

export function cylinder(height: number, radius: number, subDivisions?: number): Cone {
  return Cone.cylinder(height, radius, subDivisions);
}
