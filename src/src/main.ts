import { dedent } from '../misc/string/dedent/dedent.ts';
import { serializeNumber } from '../ast/nodes/base/number/serialize/serialize-number.ts';
import type { Rgba } from '../ast/nodes/base/color/rgba.ts';

export abstract class Object3d {
  readonly name: string;
  readonly matrix: DOMMatrix;

  constructor(name: string) {
    this.name = name;
    this.matrix = new DOMMatrix();
  }

  translate(x?: number, y?: number, z?: number): this {
    this.matrix.translateSelf(x, y, z);
    return this;
  }

  scale(
    scaleX?: number,
    scaleY?: number,
    scaleZ?: number,
    originX?: number,
    originY?: number,
    originZ?: number,
  ): this {
    this.matrix.scale(scaleX, scaleY, scaleZ, originX, originY, originZ);
    return this;
  }

  rotateAround(x?: number, y?: number, z?: number, angle?: number): this {
    this.matrix.rotateAxisAngleSelf(x, y, z, angle);
    return this;
  }

  toOpenScad(content: string): string {
    return dedent`
      // ${this.name}
      multmatrix(m = [
        [${serializeNumber(this.matrix.m11)}, ${serializeNumber(this.matrix.m21)}, ${serializeNumber(this.matrix.m31)}, ${serializeNumber(this.matrix.m41)}],
        [${serializeNumber(this.matrix.m12)}, ${serializeNumber(this.matrix.m22)}, ${serializeNumber(this.matrix.m32)}, ${serializeNumber(this.matrix.m42)}],
        [${serializeNumber(this.matrix.m13)}, ${serializeNumber(this.matrix.m23)}, ${serializeNumber(this.matrix.m33)}, ${serializeNumber(this.matrix.m43)}],
        [${serializeNumber(this.matrix.m14)}, ${serializeNumber(this.matrix.m24)}, ${serializeNumber(this.matrix.m34)}, ${serializeNumber(this.matrix.m44)}],
      ]) {
        ${content}
      }
    `;
  }
}

export interface AtomicObject3dInit {
  readonly name: string;
  readonly material: Material;
  readonly shapes: Iterable<Shape3d>;
  readonly negativeShapes?: Iterable<Shape3d>;
}

export class AtomicObject3d extends Object3d {
  readonly material: Material;
  readonly shapes: readonly Shape3d[];
  readonly negativeShapes: readonly Shape3d[];

  constructor({ name, material, shapes, negativeShapes = [] }: AtomicObject3dInit) {
    super(name);
    this.material = material;
    this.shapes = Object.freeze(Array.from(shapes));
    this.negativeShapes = Object.freeze(Array.from(negativeShapes));
  }

  override toOpenScad(): string {
    const shapes: string = Shape3d.toOpenScad(this.shapes);
    const negativeShapes: string = Shape3d.toOpenScad(this.negativeShapes);

    const allShapes: string =
      negativeShapes === ''
        ? shapes
        : dedent`
        difference() {
          ${shapes}
          ${negativeShapes}
        }
      `;

    return super.toOpenScad(
      dedent`
        color(c = [${serializeNumber(this.material.color[0])}, ${serializeNumber(this.material.color[1])}, ${serializeNumber(this.material.color[2])}, ${serializeNumber(this.material.color[3] ?? 1)}]) {
          ${allShapes}
        }
      `,
    );
  }
}

export type CompositeItemChild = CompositeItem | AtomicObject3d;

export class CompositeItem extends Object3d {
  readonly children: CompositeItemChild[];

  constructor(name: string, children: Iterable<CompositeItemChild>) {
    super(name);
    this.children = Array.from(children);
  }

  add(...children: CompositeItemChild[]): this {
    this.children.push(...children);
    return this;
  }

  override toOpenScad(): string {
    let output = '';
    for (const child of this.children) {
      if (output !== '') {
        output += '\n';
      }
      output += child.toOpenScad();
    }

    return super.toOpenScad(output);
  }
}

export interface MaterialInit {
  readonly name: string;
  readonly color: Rgba;
  readonly shopUrl?: string;
  readonly price?: number;
}

export class Material {
  readonly name: string;
  readonly color: Rgba;
  readonly shopUrl: string | undefined;
  readonly price: number | undefined;

  constructor({ name, color, shopUrl, price }: MaterialInit) {
    this.name = name;
    this.color = color;
    this.shopUrl = shopUrl;
    this.price = price;
  }
}

export abstract class Shape3d {
  static toOpenScad(shapes: Iterable<Shape3d>): string {
    let output: string = '';
    let count: number = 0;

    for (const shape of shapes) {
      count++;
      if (output !== '') {
        output += '\n';
      }
      output += shape.toOpenScad();
    }

    if (count === 1) {
      return dedent`
        union() {
          ${output}
        }
      `;
    } else {
      return output;
    }
  }

  abstract toOpenScad(): string;
}

export class Cube extends Shape3d {
  readonly x: number;
  readonly y: number;
  readonly z: number;

  constructor(x: number, y: number, z: number) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }

  override toOpenScad(): string {
    return dedent`
      cube(size = [${serializeNumber(this.x)}, ${serializeNumber(this.y)}, ${serializeNumber(this.z)}], center = true);
    `;
  }
}
