import type { ColorNode } from '../../color-node.ts';
import { serializeFunctionBlock } from '../../../../base/function/block/serialize/serialize-function-block.ts';
import { serializeOpenScadNode } from '../../../../../operations/serialize/serialize-open-scad-node.ts';
import { serializeRgba } from '../../../../base/color/serialize/serialize-rgba.ts';

export function serializeColorNode({ color, children }: ColorNode): string {
  return serializeFunctionBlock(
    'color',
    {
      c: serializeRgba(color),
    },
    children.map(serializeOpenScadNode),
  );
}
