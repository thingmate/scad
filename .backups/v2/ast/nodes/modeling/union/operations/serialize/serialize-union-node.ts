import type { UnionNode } from '../../union-node.ts';
import { serializeFunctionBlock } from '../../../../base/function/block/serialize/serialize-function-block.ts';
import { serializeOpenScadNode } from '../../../../../operations/serialize/serialize-open-scad-node.ts';

export function serializeUnionNode({ children }: UnionNode): string {
  return serializeFunctionBlock('union', {}, children.map(serializeOpenScadNode));
}
