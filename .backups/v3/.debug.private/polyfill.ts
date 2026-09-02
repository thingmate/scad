import {
  DOMMatrix,
  DOMMatrixReadOnly,
  DOMPoint,
  DOMPointReadOnly,
  DOMQuad,
  DOMRect,
  DOMRectReadOnly,
} from 'domgeom';

export function polyfill() {
  Object.assign(globalThis, {
    DOMMatrix,
    DOMMatrixReadOnly,
    DOMPoint,
    DOMPointReadOnly,
    DOMRect,
    DOMRectReadOnly,
    DOMQuad,
  });
}
