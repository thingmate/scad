import type { IntersectionNode } from '../../intersection-node.ts';
import { serializeFunctionBlock } from '../../../../base/function/block/serialize/serialize-function-block.ts';
import { serializeOpenScadNode } from '../../../../../operations/serialize/serialize-open-scad-node.ts';

export function serializeIntersectionNode({ children }: IntersectionNode): string {
  return serializeFunctionBlock('intersection', {}, children.map(serializeOpenScadNode));
}
