import { serializeFunctionCall } from '../../../../../base/function/call/serialize/serialize-function-call.ts';
import { serializeVector3d } from '../../../../../base/vector-3d/serialize/serialize-vector-3d.ts';
import { optionalExec } from '../../../../../../../misc/optional/optional-exec.ts';
import { serializeBoolean } from '../../../../../base/boolean/serialize/serialize-boolean.ts';

import type { CubeNode } from '../../cube-node.ts';

export function serializeCubeNode({ size, center }: CubeNode): string {
  return serializeFunctionCall('cube', {
    size: serializeVector3d(size),
    center: optionalExec(center, serializeBoolean),
  });
}
