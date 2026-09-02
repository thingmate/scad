import type { DifferenceNode } from '../../difference-node.ts';
import { serializeFunctionBlock } from '../../../../base/function/block/serialize/serialize-function-block.ts';
import { serializeOpenScadNode } from '../../../../../operations/serialize/serialize-open-scad-node.ts';

export function serializeDifferenceNode({ children }: DifferenceNode): string {
  return serializeFunctionBlock('difference', {}, children.map(serializeOpenScadNode));
}
