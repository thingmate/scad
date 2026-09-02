import { TURN_TO_DEG } from '../math/units/angle/constants.ts';
import { dedent } from '../misc/string/dedent/dedent.ts';
import { booleanToOpenscad } from '../types/boolean/to/openscad/boolean-to-openscad.ts';
import { numberToOpenscad } from '../types/number/to/openscad/number-to-openscad.ts';
import { vector3ToOpenscad } from '../types/vector-3/to/openscad/vector-3-to-openscad.ts';

export interface CubeOptions {
  readonly center?: boolean;
}

export class Shape {
  /* SHAPES */

  /**
   * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cube
   */
  static cube(x: number, y: number, z: number, { center = true }: CubeOptions = {}): Shape {
    return new Shape(
      `cube(size = ${vector3ToOpenscad([x, y, z])}, center = ${booleanToOpenscad(center)});`,
    );
  }

  /**
   * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cylinder
   */
  static cone(
    height: number,
    radiusBottom: number,
    radiusTop: number,
    subDivisions: number = 16,
  ): Shape {
    return new Shape(
      `cylinder(h = ${numberToOpenscad(height)}, r1 = ${numberToOpenscad(radiusBottom)}, r2 = ${numberToOpenscad(radiusTop)}, center = true, $fn = ${numberToOpenscad(subDivisions)});`,
    );
  }

  static cylinder(height: number, radius: number, subDivisions?: number): Shape {
    return this.cone(height, radius, radius, subDivisions);
  }

  /* TRANSFORM */

  static translate(shape: Shape, x: number, y: number, z: number): Shape {
    if (x === 0 && y === 0 && z === 0) {
      return shape;
    }
    return new Shape(
      dedent`
        translate(${vector3ToOpenscad([x, y, z])}) {
          ${shape.code}
        }
      `,
    );
  }

  static rotateX(shape: Shape, angle: number /* turn */): Shape {
    return this.rotate(shape, 1, 0, 0, angle);
  }

  static rotateY(shape: Shape, angle: number /* turn */): Shape {
    return this.rotate(shape, 0, 1, 0, angle);
  }

  static rotateZ(shape: Shape, angle: number /* turn */): Shape {
    return this.rotate(shape, 0, 0, 1, angle);
  }

  static rotate(shape: Shape, x: number, y: number, z: number, angle: number /* turn */): Shape {
    if (angle % 1 === 0) {
      return shape;
    }
    return new Shape(
      dedent`
        rotate(a = ${numberToOpenscad(angle * TURN_TO_DEG)}, v = ${vector3ToOpenscad([x, y, z])}) {
          ${shape.code}
        }
      `,
    );
  }

  /* ASSEMBLE */

  static union(...shapes: Shape[]): Shape {
    if (shapes.length < 2) {
      throw new Error('At least 2 shapes are required');
    }

    return new Shape(
      dedent`
        union() {
          ${shapes.map((shape: Shape): string => shape.toOpenscad()).join('\n')}
        }
      `,
    );
  }

  static difference(...shapes: Shape[]): Shape {
    if (shapes.length < 2) {
      throw new Error('At least 2 shapes are required');
    }

    return new Shape(
      dedent`
        difference() {
          ${shapes.map((shape: Shape): string => shape.toOpenscad()).join('\n')}
        }
      `,
    );
  }

  static intersection(...shapes: Shape[]): Shape {
    if (shapes.length < 2) {
      throw new Error('At least 2 shapes are required');
    }

    return new Shape(
      dedent`
        intersection() {
          ${shapes.map((shape: Shape): string => shape.toOpenscad()).join('\n')}
        }
      `,
    );
  }

  /* MODIFIERS */

  static debug(shape: Shape): Shape {
    return new Shape(
      dedent`
        #union() {
          ${shape.code}
        }
      `,
    );
  }

  readonly code: string;

  constructor(code: string) {
    this.code = code;
  }

  toOpenscad(): string {
    return this.code;
  }

  /* ASSEMBLE */

  translate(x: number, y: number, z: number): Shape {
    return Shape.translate(this, x, y, z);
  }

  rotateX(angle: number /* turn */): Shape {
    return Shape.rotateX(this, angle);
  }

  rotateY(angle: number /* turn */): Shape {
    return Shape.rotateY(this, angle);
  }

  rotateZ(angle: number /* turn */): Shape {
    return Shape.rotateZ(this, angle);
  }

  rotate(x: number, y: number, z: number, angle: number /* turn */): Shape {
    return Shape.rotate(this, x, y, z, angle);
  }

  /* ASSEMBLE */

  union(...shapes: Shape[]): Shape {
    return Shape.union(this, ...shapes);
  }

  difference(...shapes: Shape[]): Shape {
    return Shape.difference(this, ...shapes);
  }

  intersection(...shapes: Shape[]): Shape {
    return Shape.intersection(this, ...shapes);
  }

  /* MODIFIERS */

  debug(): Shape {
    return Shape.debug(this);
  }
}
