import { dedent } from '../../../../misc/string/dedent/dedent.ts';
import { numberToOpenscad } from '../../../number/to/openscad/number-to-openscad.ts';

export function domMatrixToOpenscad(input: DOMMatrixReadOnly): string {
  return dedent`
    [
      [${numberToOpenscad(input.m11)}, ${numberToOpenscad(input.m21)}, ${numberToOpenscad(input.m31)}, ${numberToOpenscad(input.m41)}],
      [${numberToOpenscad(input.m12)}, ${numberToOpenscad(input.m22)}, ${numberToOpenscad(input.m32)}, ${numberToOpenscad(input.m42)}],
      [${numberToOpenscad(input.m13)}, ${numberToOpenscad(input.m23)}, ${numberToOpenscad(input.m33)}, ${numberToOpenscad(input.m43)}],
      [${numberToOpenscad(input.m14)}, ${numberToOpenscad(input.m24)}, ${numberToOpenscad(input.m34)}, ${numberToOpenscad(input.m44)}],
    ]
  `;
}
