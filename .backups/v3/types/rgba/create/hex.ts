import type { Rgba } from '../rgba.ts';

export function hex(input: string | number): Rgba {
  let value: number;

  if (typeof input === 'string') {
    if (input.startsWith('#')) {
      input = input.slice(1);
    }

    if (input.length === 3) {
      input = `${input[0]}${input[0]}${input[1]}${input[1]}${input[2]}${input[2]}ff`;
    } else if (input.length === 4) {
      input = `${input[0]}${input[0]}${input[1]}${input[1]}${input[2]}${input[2]}${input[3]}${input[3]}`;
    } else if (input.length === 6) {
      input = `${input}ff`;
    } else if (input.length === 8) {
      // do nothing
    } else {
      throw new Error('Invalid hex color');
    }

    value = Number(`0x${input}`);
  } else {
    value = input;
  }

  if (!Number.isSafeInteger(value) || value < 0 || value > 0xffff_ffff) {
    throw new Error('Invalid hex color');
  }

  return [
    ((value >> 24) & 0xff) / 0xff,
    ((value >> 16) & 0xff) / 0xff,
    ((value >> 8) & 0xff) / 0xff,
    (value & 0xff) / 0xff,
  ];
}
