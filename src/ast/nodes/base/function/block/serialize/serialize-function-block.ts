import type { FunctionArguments } from '../../arguments/function-arguments.ts';
import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';
import { serializeFunctionArguments } from '../../arguments/serialize/serialize-function-arguments.ts';

/**
 * Serializes a function block into a string representation (open-scad format).
 *
 * @param {string} name The name of the function to serialize.
 * @param {FunctionArguments} args The arguments of the function, represented as a structured object.
 * @param {string | readonly string[]} body The body of the function, which can be a single string or an array of strings for multiline content.
 * @return {string} A serialized string representation of the function block.
 */
export function serializeFunctionBlock(
  name: string,
  args: FunctionArguments,
  body: string | readonly string[],
): string {
  return dedent`
    ${name}(${serializeFunctionArguments(args)}) {
      ${Array.isArray(body) ? body.join('\n') : (body as string)}
    }
  `;
}
