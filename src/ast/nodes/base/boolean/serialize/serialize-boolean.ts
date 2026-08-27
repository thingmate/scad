
/**
 * Serializes a boolean value into its string representation (open-scad format).
 *
 * @param {boolean} input - The boolean value to be serialized.
 * @return {string} The string representation of the boolean value ("true" or "false").
 */
export function serializeBoolean(
  input: boolean,
): string {
  return input
    ? 'true'
    : 'false';
}
