import { dedent } from '../../../../misc/string/dedent/dedent.ts';
import { vector3ToOpenscad } from '../../../vector-3/to/openscad/vector-3-to-openscad.ts';
import type { Vector3 } from '../../../vector-3/vector-3.ts';
import { isTranslationMatrix } from '../../is/is-translation-matrix.ts';
import { domMatrixToOpenscad } from './dom-matrix-to-openscad.ts';

export function domMatrixToOpenscadTransform(input: DOMMatrixReadOnly, content: string): string {
  let translation: Vector3 | undefined;

  if (input.isIdentity) {
    return content;
  } else if ((translation = isTranslationMatrix(input))) {
    return dedent`
      translate(${vector3ToOpenscad(translation)}) {
        ${content}
      }
    `;
  } else {
    return dedent`
      multmatrix(m = ${domMatrixToOpenscad(input)}) {
        ${content}
      }
    `;
  }
}
