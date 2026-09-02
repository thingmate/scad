import { numberToOpenscad } from '../../../../types/number/to/openscad/number-to-openscad.ts';
import { Shape3d } from '../../shape-3d.ts';

export class Sphere extends Shape3d {
  readonly radius: number;
  readonly subDivisions: number;

  constructor(radius: number, subDivisions: number = 16) {
    super();
    this.radius = radius;
    this.subDivisions = subDivisions;
  }

  /**
   * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#sphere
   */
  override toOpenscad(): string {
    return super.toOpenscad(
      `sphere(r = ${numberToOpenscad(this.radius)}, $fn = ${numberToOpenscad(this.subDivisions)});`,
    );
  }
}

/*--*/

export function sphere(radius: number, subDivisions?: number): Sphere {
  return new Sphere(radius, subDivisions);
}
