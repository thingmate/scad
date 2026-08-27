import { throwUnsupportedPCBPart } from '../../../shared/throw-unsupported-pcb-part';
import { isPCBComponent } from '../../individual/component/is-pcb-component';
import { mirrorPCBComponent } from '../../individual/component/operations/transform/mirror-pcb-component';
import { rotatePCBComponent } from '../../individual/component/operations/transform/rotate-pcb-component';
import { isPCBConnectionPoint } from '../../individual/connection-point/is-pcb-connection-point';
import { mirrorPCBConnectionPoint } from '../../individual/connection-point/operations/transform/mirror-pcb-connection-point';
import { isPCBCopper } from '../../individual/copper/is-pcb-copper';
import { mirrorPCBCopper } from '../../individual/copper/operations/transform/mirror-pcb-copper';
import { isPCBHole } from '../../individual/hole/is-pcb-hole';
import { mirrorPCBHole } from '../../individual/hole/operations/transform/mirror-pcb-hole';
import { IPCBPart } from '../../individual/pcb-part.type';
import { isPCBSilkscreen } from '../../individual/silkscreen/is-pcb-silkscreen';
import { mirrorPCBSilkscreen } from '../../individual/silkscreen/operations/transform/mirror-pcb-silkscreen';
import { isPCBSolderMask } from '../../individual/solder-mask/is-pcb-solder-mask';
import { mirrorPCBSolderMask } from '../../individual/solder-mask/operations/transform/mirror-pcb-solder-mask';
import { isPCBSolderPaste } from '../../individual/solder-paste/is-pcb-solder-paste';
import { mirrorPCBSolderPaste } from '../../individual/solder-paste/operations/transform/mirror-pcb-solder-paste';

export function mirrorPCBPart<GPCBPart extends IPCBPart>(
  part: GPCBPart,
  around: number,
): GPCBPart {
  if (isPCBCopper(part)) {
    return mirrorPCBCopper(part, around) as GPCBPart;
  } else if (isPCBSolderMask(part)) {
    return mirrorPCBSolderMask(part, around) as GPCBPart;
  } else if (isPCBSolderPaste(part)) {
    return mirrorPCBSolderPaste(part, around) as GPCBPart;
  } else if (isPCBSilkscreen(part)) {
    return mirrorPCBSilkscreen(part, around) as GPCBPart;
  } else if (isPCBHole(part)) {
    return mirrorPCBHole(part, around) as GPCBPart;
  } else if (isPCBComponent(part)) {
    return mirrorPCBComponent(part, around) as GPCBPart;
  } else if (isPCBConnectionPoint(part)) {
    return mirrorPCBConnectionPoint(part, around) as GPCBPart;
  } else {
    throwUnsupportedPCBPart(part);
  }
}

export function mirrorPCBParts(
  parts: IPCBPart[],
  around: number = 0,
): IPCBPart[] {
  for (let i = 0, l = parts.length; i < l; i++) {
    mirrorPCBPart(parts[i], around);
  }
  return parts;
}
