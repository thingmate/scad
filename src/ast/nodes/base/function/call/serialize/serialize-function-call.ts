import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';
import { serializeFunctionArguments } from '../../arguments/serialize/serialize-function-arguments.ts';
import type { FunctionArguments } from '../../arguments/function-arguments.ts';

/**
 * Serializes a function call into a string representation (open-scad format).
 *
 * @param {string} name - The name of the function call to serialize.
 * @param {FunctionArguments} args - The arguments to pass to the function call.
 * @return {string} A string representation of the function call with its name and serialized arguments.
 */
export function serializeFunctionCall(name: string, args: FunctionArguments): string {
  return dedent`
    ${name}(${serializeFunctionArguments(args)});
  `;
}
