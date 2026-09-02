import type { Vector3 } from '../../vector-3/vector-3.ts';

export function isTranslationMatrix(input: DOMMatrixReadOnly): Vector3 | undefined {
  if (
    input.m11 === 1 &&
    input.m21 === 0 &&
    input.m31 === 0 &&
    input.m12 === 0 &&
    input.m22 === 1 &&
    input.m32 === 0 &&
    input.m13 === 0 &&
    input.m23 === 0 &&
    input.m33 === 1 &&
    input.m14 === 0 &&
    input.m24 === 0 &&
    input.m34 === 0 &&
    input.m44 === 1
  ) {
    return [input.m41, input.m42, input.m42];
  } else {
    return undefined;
  }
}
