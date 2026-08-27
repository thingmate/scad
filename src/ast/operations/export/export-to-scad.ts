import { mkdir, writeFile } from 'node:fs/promises';
import type { GenericOpenScadNode } from '../../nodes/open-scad-node.ts';
import { dirname } from 'node:path';
import { serializeOpenScadNode } from '../serialize/serialize-open-scad-node.ts';

export async function exportToScad(
  path: string,
  nodes: GenericOpenScadNode | readonly GenericOpenScadNode[],
): Promise<void> {
  if (!Array.isArray(nodes)) {
    nodes = [nodes as GenericOpenScadNode];
  }
  await mkdir(dirname(path), {
    recursive: true,
  });

  await writeFile(path, nodes.map(serializeOpenScadNode).join('\n') + '\n', {
    encoding: 'utf-8',
  });
}
