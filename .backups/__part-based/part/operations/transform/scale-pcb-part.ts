import { ReadonlyVec2 } from 'gl-matrix';
import { NULL_VEC2 } from '../../../../misc/math/null-vec2';
import { throwUnsupportedPCBPart } from '../../../shared/throw-unsupported-pcb-part';
import { isPCBComponent } from '../../individual/component/is-pcb-component';
import { scalePCBComponent } from '../../individual/component/operations/transform/scale-pcb-component';
import { isPCBConnectionPoint } from '../../individual/connection-point/is-pcb-connection-point';
import { scalePCBConnectionPoint } from '../../individual/connection-point/operations/transform/scale-pcb-connection-point';
import { isPCBCopper } from '../../individual/copper/is-pcb-copper';
import { scalePCBCopper } from '../../individual/copper/operations/transform/scale-pcb-copper';
import { isPCBHole } from '../../individual/hole/is-pcb-hole';
import { scalePCBHole } from '../../individual/hole/operations/transform/scale-pcb-hole';
import { IPCBPart } from '../../individual/pcb-part.type';
import { isPCBSilkscreen } from '../../individual/silkscreen/is-pcb-silkscreen';
import { scalePCBSilkscreen } from '../../individual/silkscreen/operations/transform/scale-pcb-silkscreen';
import { isPCBSolderMask } from '../../individual/solder-mask/is-pcb-solder-mask';
import { scalePCBSolderMask } from '../../individual/solder-mask/operations/transform/scale-pcb-solder-mask';
import { isPCBSolderPaste } from '../../individual/solder-paste/is-pcb-solder-paste';
import { scalePCBSolderPaste } from '../../individual/solder-paste/operations/transform/scale-pcb-solder-paste';

export function scalePCBPart<GPCBPart extends IPCBPart>(
  part: GPCBPart,
  scaling: number,
  around: ReadonlyVec2,
): GPCBPart {
  if (isPCBCopper(part)) {
    return scalePCBCopper(part, scaling, around) as GPCBPart;
  } else if (isPCBSolderMask(part)) {
    return scalePCBSolderMask(part, scaling, around) as GPCBPart;
  } else if (isPCBSolderPaste(part)) {
    return scalePCBSolderPaste(part, scaling, around) as GPCBPart;
  } else if (isPCBSilkscreen(part)) {
    return scalePCBSilkscreen(part, scaling, around) as GPCBPart;
  } else if (isPCBHole(part)) {
    return scalePCBHole(part, scaling, around) as GPCBPart;
  } else if (isPCBComponent(part)) {
    return scalePCBComponent(part, scaling, around) as GPCBPart;
  } else if (isPCBConnectionPoint(part)) {
    return scalePCBConnectionPoint(part, scaling, around) as GPCBPart;
  } else {
    throwUnsupportedPCBPart(part);
  }
}

export function scalePCBParts(
  parts: IPCBPart[],
  scaling: number,
  around: ReadonlyVec2 = NULL_VEC2,
): IPCBPart[] {
  for (let i = 0, l = parts.length; i < l; i++) {
    scalePCBPart(parts[i], scaling, around);
  }
  return parts;
}
