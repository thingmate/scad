import type { RotateNode } from '../../rotate-node.ts';
import { serializeFunctionBlock } from '../../../../base/function/block/serialize/serialize-function-block.ts';
import { serializeOpenScadNode } from '../../../../../operations/serialize/serialize-open-scad-node.ts';
import { serializeVector3d } from '../../../../base/vector-3d/serialize/serialize-vector-3d.ts';
import { optionalExec } from '../../../../../../misc/optional/optional-exec.ts';
import { serializeNumber } from '../../../../base/number/serialize/serialize-number.ts';
import { isVector3d, type Vector3d } from '../../../../base/vector-3d/vector-3d.ts';

export function serializeRotateNode({ angle, vector, children }: RotateNode): string {
  return serializeFunctionBlock(
    'rotate',
    {
      a: isVector3d(angle) ? serializeVector3d(angle) : serializeNumber(angle),
      v: optionalExec(vector, serializeVector3d),
    },
    children.map(serializeOpenScadNode),
  );
}
