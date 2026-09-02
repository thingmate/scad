import { Lines } from '../../misc/lines/lines.ts';
import { union } from '../modeling/union.ts';

export interface RepeatCallback {
  (
    index: number,
  ): Lines;
}

/**
 * Repeats `count` times a "shape".
 */
export function repeat(
  count: number,
  callback: RepeatCallback,
): Lines {
  return union(
    Array.from({ length: count }, (_, index: number) => callback(index)),
  );
}

// export function repeat(
//   count: number,
//   callback: IRepeatCallback,
// ): ILines {
//   const lines: ILines[] = [];
//
//   for (let i = 0; i < count; i++) {
//     lines.push(callback(i));
//   }
//
//   return union(lines);
// }
