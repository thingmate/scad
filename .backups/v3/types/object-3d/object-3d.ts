import { TURN_TO_DEG } from '../../math/units/angle/constants.ts';
import { dedent } from '../../misc/string/dedent/dedent.ts';
import { isTranslationMatrix } from '../matrix/is/is-translation-matrix.ts';
import { domMatrixToOpenscad } from '../matrix/to/openscad/dom-matrix-to-openscad.ts';
import { vector3ToOpenscad } from '../vector-3/to/openscad/vector-3-to-openscad.ts';
import type { Vector3 } from '../vector-3/vector-3.ts';

export abstract class Object3d {
  readonly matrix: DOMMatrix;

  constructor() {
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

  rotateX(angle: number): this {
    return this.rotateAround(1, 0, 0, angle);
  }

  rotateY(angle: number): this {
    return this.rotateAround(0, 1, 0, angle);
  }

  rotateZ(angle: number): this {
    return this.rotateAround(0, 0, 1, angle);
  }

  rotateAround(x: number, y: number, z: number, angle: number): this {
    this.matrix.rotateAxisAngleSelf(x, y, z, angle * TURN_TO_DEG);
    return this;
  }

  toOpenscad(content: string = '/* no-op */'): string {
    let translation: Vector3 | undefined;

    if (this.matrix.isIdentity) {
      return content;
    } else if ((translation = isTranslationMatrix(this.matrix))) {
      return dedent`
        translate(${vector3ToOpenscad(translation)}) {
          ${content}
        }
      `;
    } else {
      return dedent`
        multmatrix(m = ${domMatrixToOpenscad(this.matrix)}) {
          ${content}
        }
      `;
    }
  }
}
