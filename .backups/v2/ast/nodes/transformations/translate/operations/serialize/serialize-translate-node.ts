import type { TranslateNode } from '../../translate-node.ts';
import { serializeFunctionBlock } from '../../../../base/function/block/serialize/serialize-function-block.ts';
import { serializeOpenScadNode } from '../../../../../operations/serialize/serialize-open-scad-node.ts';
import { serializeVector3d } from '../../../../base/vector-3d/serialize/serialize-vector-3d.ts';

export function serializeTranslateNode({ vector, children }: TranslateNode): string {
  return serializeFunctionBlock(
    'translate',
    {
      v: serializeVector3d(vector),
    },
    children.map(serializeOpenScadNode),
  );
}
