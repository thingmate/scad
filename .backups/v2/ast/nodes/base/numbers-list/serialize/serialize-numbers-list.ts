import { serializeNumber } from '../../number/serialize/serialize-number.ts';
import type { NumbersList } from '../numbers-list.ts';

/**
 * Serializes a list of numbers into a string representation (open-scad format).
 *
 * @param {NumbersList} input - The list of numbers to serialize.
 * @return {string} A string representation of the serialized numbers list.
 */
export function serializeNumbersList(input: NumbersList): string {
  return `[${input.map(serializeNumber).join(', ')}]`;
}
