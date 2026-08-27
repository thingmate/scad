import {
  DOMMatrix,
  DOMMatrixReadOnly,
  DOMPoint,
  DOMPointReadOnly,
  DOMRect,
  DOMRectReadOnly,
  DOMQuad,
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
