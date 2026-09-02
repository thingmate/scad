import { dedent } from '../../../../misc/string/dedent/dedent.ts';
import type { Rgba } from '../../rgba.ts';
import { rgbaToOpenscad } from './rgba-to-openscad.ts';

export function rgbaToOpenscadBlock(input: Rgba, content: string): string {
  return dedent`
    color(${rgbaToOpenscad(input)}) {
      ${content}
    }
  `;
}
