import type { Rgba } from '../rgba.ts';

/**
 * @inheritDoc https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/rgb
 */
export function cssRgb(input: string): Rgba {
  const match: RegExpMatchArray | null = input.match(
    /^rgb\(\s*([^ ]+)\s+([^ ]+)\s+([^ ]+)\s*(?:\/\s*([^ ]+)\s*)?\)$/,
  );

  if (match === null) {
    throw new Error('Invalid CSS rgb color');
  }

  return [
    parseRgbChannel(match[1]),
    parseRgbChannel(match[2]),
    parseRgbChannel(match[3]),
    match[4] === undefined ? 1 : parseAlphaChannel(match[4]),
  ];
}

function parseRgbChannel(input: string): number {
  const value: number = Number(input);
  if (Number.isNaN(value) || value < 0 || value > 0xff) {
    throw new Error('Invalid rgb color');
  }
  return value / 0xff;
}

function parseAlphaChannel(input: string): number {
  if (input.endsWith('%')) {
    input = input.slice(0, -1);
    const value: number = Number(input);
    if (Number.isNaN(value) || value < 0 || value > 100) {
      throw new Error('Invalid rgb color');
    }
    return value / 100;
  } else {
    const value: number = Number(input);
    if (Number.isNaN(value) || value < 0 || value > 1) {
      throw new Error('Invalid rgb color');
    }
    return value;
  }
}
