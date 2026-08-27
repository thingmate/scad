import type { FunctionArguments } from '../function-arguments.ts';
import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';
import { indent } from '../../../../../../misc/string/indent/indent.ts';

/**
 * Serializes a record of function arguments into a string representation (open-scad format).
 *
 * @param {FunctionArguments} args - The function arguments to be serialized.
 * @return {string} A string representation of the serialized function arguments.
 */
export function serializeFunctionArguments(args: FunctionArguments): string {
  let output: string = '';

  type Entry = [key: string, value: string | undefined];
  type FilteredEntry = [key: string, value: string];

  const filteredArgs: readonly FilteredEntry[] = Object.entries(args).filter<FilteredEntry>(
    (entry: Entry): entry is FilteredEntry => {
      return entry[1] !== undefined;
    },
  );

  for (const [name, value] of filteredArgs) {
    if (output !== '') {
      output += ',\n';
    }
    output += dedent`
      ${name} = ${value}
    `;
  }

  return filteredArgs.length >= 2 ? `\n${indent(output)}\n` : output;
}
