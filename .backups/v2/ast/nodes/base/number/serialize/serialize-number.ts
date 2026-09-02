/**
 * Converts a number into its serialized string representation (open-scad format).
 *
 * @param {number} input - The number to be serialized. Special cases include:
 *                         Number.NaN is converted to 'nan',
 *                         Number.POSITIVE_INFINITY is converted to 'inf',
 *                         and -Number.POSITIVE_INFINITY is converted to '-inf'.
 * @return {string} The serialized string representation of the input number.
 */
export function serializeNumber(
  input: number,
): string {
  if (Number.isNaN(input)) {
    return 'nan';
  } else if (input === Number.POSITIVE_INFINITY) {
    return 'inf';
  } else if (input === -Number.POSITIVE_INFINITY) {
    return '-inf';
  } else {
    return input.toString(10);
  }
}
