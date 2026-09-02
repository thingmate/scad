import { serializeFunctionCall } from '../../../../../base/function/call/serialize/serialize-function-call.ts';
import { optionalExec } from '../../../../../../../misc/optional/optional-exec.ts';
import { serializeNumber } from '../../../../../base/number/serialize/serialize-number.ts';
import type { SphereNode } from '../../sphere-node.ts';

export function serializeSphereNode({
  radius,
  fragmentAngle,
  fragmentSize,
  fragmentNumber,
}: SphereNode): string {
  return serializeFunctionCall('sphere', {
    r: serializeNumber(radius),
    $fa: optionalExec(fragmentAngle, serializeNumber),
    $fs: optionalExec(fragmentSize, serializeNumber),
    $fn: optionalExec(fragmentNumber, serializeNumber),
  });
}
