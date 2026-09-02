import { serializeFunctionCall } from '../../../../../base/function/call/serialize/serialize-function-call.ts';
import { optionalExec } from '../../../../../../../misc/optional/optional-exec.ts';
import { serializeBoolean } from '../../../../../base/boolean/serialize/serialize-boolean.ts';
import { serializeNumber } from '../../../../../base/number/serialize/serialize-number.ts';
import type { ConeNode } from '../../cone-node.ts';

export function serializeConeNode({
  height,
  radiusBottom,
  radiusTop,
  center,
  fragmentAngle,
  fragmentSize,
  fragmentNumber,
}: ConeNode): string {
  return serializeFunctionCall('cylinder', {
    h: serializeNumber(height),
    r1: serializeNumber(radiusBottom),
    r2: serializeNumber(radiusTop),
    center: optionalExec(center, serializeBoolean),
    $fa: optionalExec(fragmentAngle, serializeNumber),
    $fs: optionalExec(fragmentSize, serializeNumber),
    $fn: optionalExec(fragmentNumber, serializeNumber),
  });
}
