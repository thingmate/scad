import { serializeFunctionCall } from '../../../../../base/function/call/serialize/serialize-function-call.ts';
import { optionalExec } from '../../../../../../../misc/optional/optional-exec.ts';

import type { PolyhedronNode } from '../../polyhedron-node.ts';
import { serializePoints3dList } from '../../../../../base/points-3d-list/serialize/serialize-points-3d-list.ts';
import { serializeNumber } from '../../../../../base/number/serialize/serialize-number.ts';
import { serializeNumbersList } from '../../../../../base/numbers-list/serialize/serialize-numbers-list.ts';

export function serializePolyhedronNode({ points, faces, convexity }: PolyhedronNode): string {
  return serializeFunctionCall('polyhedron', {
    points: serializePoints3dList(points),
    faces: `[${faces.map(serializeNumbersList).join(', ')}]`,
    convexity: optionalExec(convexity, serializeNumber),
  });
}
