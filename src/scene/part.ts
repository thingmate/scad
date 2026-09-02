import { BOM } from './bom.ts';
import { Material } from './material.ts';
import { dedent } from '../misc/string/dedent/dedent.ts';
import { Shape } from './shape.ts';
import { domMatrixToOpenscadTransform } from '../types/matrix/to/openscad/dom-matrix-to-openscad-transform.ts';

export interface PartOptions {
  readonly name: string;
  readonly matrix?: DOMMatrixReadOnly;
  readonly parts?: readonly Part[];
  readonly shape?: Shape;
  readonly material?: Material;
}

export class Part {
  static translate(part: Part, x: number, y: number, z: number): Part {
    return new Part({
      ...part,
      matrix: part.matrix.translate(x, y, z),
    });
  }

  static rotateX(part: Part, angle: number): Part {
    return part.rotate(1, 0, 0, angle);
  }

  static rotateY(part: Part, angle: number): Part {
    return part.rotate(0, 1, 0, angle);
  }

  static rotateZ(part: Part, angle: number): Part {
    return part.rotate(0, 0, 1, angle);
  }

  static rotate(part: Part, x: number, y: number, z: number, angle: number): Part {
    return new Part({
      ...part,
      matrix: part.matrix.rotateAxisAngle(x, y, z, angle),
    });
  }

  static scale(
    part: Part,
    scaleX: number,
    scaleY: number,
    scaleZ: number,
    originX?: number,
    originY?: number,
    originZ?: number,
  ): Part {
    return new Part({
      ...part,
      matrix: part.matrix.scale(scaleX, scaleY, scaleZ, originX, originY, originZ),
    });
  }

  readonly name: string;
  readonly matrix: DOMMatrixReadOnly;
  readonly parts: readonly Part[];
  readonly shape: Shape | undefined;
  readonly material: Material | undefined;

  constructor({ name, matrix = new DOMMatrix(), parts = [], shape, material }: PartOptions) {
    this.name = name;
    this.matrix = matrix;
    this.parts = parts;
    this.shape = shape;
    this.material = material;
  }

  /* TRANSFORM */

  translate(x: number, y: number, z: number): Part {
    return new Part({
      ...this,
      matrix: this.matrix.translate(x, y, z),
    });
  }

  rotateX(angle: number): Part {
    return this.rotate(1, 0, 0, angle);
  }

  rotateY(angle: number): Part {
    return this.rotate(0, 1, 0, angle);
  }

  rotateZ(angle: number): Part {
    return this.rotate(0, 0, 1, angle);
  }

  rotate(x: number, y: number, z: number, angle: number): Part {
    return new Part({
      ...this,
      matrix: this.matrix.rotateAxisAngle(x, y, z, angle),
    });
  }

  scale(
    scaleX: number,
    scaleY: number,
    scaleZ: number,
    originX?: number,
    originY?: number,
    originZ?: number,
  ): Part {
    return new Part({
      ...this,
      matrix: this.matrix.scale(scaleX, scaleY, scaleZ, originX, originY, originZ),
    });
  }

  /* TO */

  toOpenscad(): string {
    let content: string = '';

    if (this.shape === undefined) {
      content = this.parts.map((part: Part): string => part.toOpenscad()).join('\n');
      if (this.parts.length > 1) {
        content = dedent`
          union() {
            ${content}
          }
        `;
      }
    } else {
      content = this.shape.toOpenscad();
    }

    content = domMatrixToOpenscadTransform(this.matrix, content);

    if (this.material !== undefined) {
      content = this.material.toOpenScad(content);
    }

    return dedent`
      // ${this.name}
      ${content}
    `;
  }

  toBOM(bom: BOM = new BOM()): BOM {
    if (this.material === undefined) {
      for (const part of this.parts) {
        part.toBOM(bom);
      }
    } else {
      if (this.material.shopUrl !== undefined || this.material.unitPrice !== undefined) {
        bom.add(this.name, this.material);
      }
    }
    return bom;
  }
}
