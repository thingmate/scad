import type { Rgba } from '../rgba.ts';
import { cssRgb } from './css-rgb.ts';
import { hex } from './hex.ts';

export function rgba(input: string): Rgba;
export function rgba(r: number, g: number, b: number, a?: number): Rgba;
export function rgba(r: number | string, g?: number, b?: number, a?: number): Rgba {
  if (typeof r === 'string') {
    if (r.startsWith('#')) {
      return hex(r);
    } else if (r.startsWith('rgb(')) {
      return cssRgb(r);
    } else {
      throw new Error(`Invalid rgba string: ${r}.`);
    }
  } else {
    return [r, g!, b!, a ?? 1];
  }
}
