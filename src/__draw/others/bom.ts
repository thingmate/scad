import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { stringToLines } from '../../misc/lines/functions/string-to-lines.ts';
import { Lines } from '../../misc/lines/lines.ts';

export interface BOMOptions {
  readonly title: string;
  readonly description?: string;
  readonly datasheetURL?: string;
  readonly storeURL?: string;
  readonly manufacturer?: string;
  readonly partNumber?: string;
  readonly value?: string;
}

/**
 * Creates a BOM comment.
 */
export function bom(
  options: BOMOptions,
): Lines {
  return [
    `/* BOM`,
    ...indentLines(
      stringToLines(JSON.stringify(options, null, 2)),
    ),
    `*/`,
  ];
}
