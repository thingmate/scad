import type { NumbersList } from '../numbers-list.ts';
import { serializeNumbersList } from './serialize-numbers-list.ts';


/**
 * Serializes a list of numbers into a string representation of points, grouped by the specified dimension (open-scad format).
 *
 * @param {NumbersList} list - The list of numbers to be serialized into points.
 * @param {number} dimension - The number of values representing each point in the list.
 * @return {string} The serialized string representation of the list of points.
 * @throws {Error} Throws an error if the list length is not a multiple of the specified dimension.
 */
export function serializePointsList(
  list: NumbersList,
  dimension: number,
): string {
  let output: string = '[\n';
  const length: number = list.length;
  const last: number = length - dimension;
  if ((length % dimension) === 0) {
    for (let i: number = 0; i < length; i += dimension) {
      output += `  ${serializeNumbersList(list.slice(i, i + dimension))}${(i === last) ? '' : ','}\n`;
    }
    output += ']';
    return output;
  } else {
    throw new Error(`The list of points must have a number of values multiple of ${list}`);
  }
}

