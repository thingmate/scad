import { ReadonlyVec2 } from 'gl-matrix';
import { NULL_VEC2 } from '../../../../misc/math/null-vec2';
import { throwUnsupportedPCBPart } from '../../../shared/throw-unsupported-pcb-part';
import { isPCBComponent } from '../../individual/component/is-pcb-component';
import { rotatePCBComponent } from '../../individual/component/operations/transform/rotate-pcb-component';
import { isPCBConnectionPoint } from '../../individual/connection-point/is-pcb-connection-point';
import { rotatePCBConnectionPoint } from '../../individual/connection-point/operations/transform/rotate-pcb-connection-point';
import { isPCBCopper } from '../../individual/copper/is-pcb-copper';
import { rotatePCBCopper } from '../../individual/copper/operations/transform/rotate-pcb-copper';
import { isPCBHole } from '../../individual/hole/is-pcb-hole';
import { rotatePCBHole } from '../../individual/hole/operations/transform/rotate-pcb-hole';
import { IPCBPart } from '../../individual/pcb-part.type';
import { isPCBSilkscreen } from '../../individual/silkscreen/is-pcb-silkscreen';
import { rotatePCBSilkscreen } from '../../individual/silkscreen/operations/transform/rotate-pcb-silkscreen';
import { isPCBSolderMask } from '../../individual/solder-mask/is-pcb-solder-mask';
import { rotatePCBSolderMask } from '../../individual/solder-mask/operations/transform/rotate-pcb-solder-mask';
import { isPCBSolderPaste } from '../../individual/solder-paste/is-pcb-solder-paste';
import { rotatePCBSolderPaste } from '../../individual/solder-paste/operations/transform/rotate-pcb-solder-paste';

export function rotatePCBPart<GPCBPart extends IPCBPart>(
  part: GPCBPart,
  rotation: number,
  around: ReadonlyVec2,
): GPCBPart {
  if (isPCBCopper(part)) {
    return rotatePCBCopper(part, rotation, around) as GPCBPart;
  } else if (isPCBSolderMask(part)) {
    return rotatePCBSolderMask(part, rotation, around) as GPCBPart;
  } else if (isPCBSolderPaste(part)) {
    return rotatePCBSolderPaste(part, rotation, around) as GPCBPart;
  } else if (isPCBSilkscreen(part)) {
    return rotatePCBSilkscreen(part, rotation, around) as GPCBPart;
  } else if (isPCBHole(part)) {
    return rotatePCBHole(part, rotation, around) as GPCBPart;
  } else if (isPCBComponent(part)) {
    return rotatePCBComponent(part, rotation, around) as GPCBPart;
  } else if (isPCBConnectionPoint(part)) {
    return rotatePCBConnectionPoint(part, rotation, around) as GPCBPart;
  } else {
    throwUnsupportedPCBPart(part);
  }
}

export function rotatePCBParts(
  parts: IPCBPart[],
  rotation: number,
  around: ReadonlyVec2 = NULL_VEC2,
): IPCBPart[] {
  for (let i = 0, l = parts.length; i < l; i++) {
    rotatePCBPart(parts[i], rotation, around);
  }
  return parts;
}
