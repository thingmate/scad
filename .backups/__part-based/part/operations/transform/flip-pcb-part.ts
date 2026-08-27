import { throwUnsupportedPCBPart } from '../../../shared/throw-unsupported-pcb-part';
import { isPCBComponent } from '../../individual/component/is-pcb-component';
import { flipPCBComponent } from '../../individual/component/operations/transform/flip-pcb-component';
import { isPCBConnectionPoint } from '../../individual/connection-point/is-pcb-connection-point';
import { flipPCBConnectionPoint } from '../../individual/connection-point/operations/transform/flip-pcb-connection-point';
import { isPCBCopper } from '../../individual/copper/is-pcb-copper';
import { flipPCBCopper } from '../../individual/copper/operations/transform/flip-pcb-copper';
import { isPCBHole } from '../../individual/hole/is-pcb-hole';
import { flipPCBHole } from '../../individual/hole/operations/transform/flip-pcb-hole';
import { IPCBPart } from '../../individual/pcb-part.type';
import { isPCBSilkscreen } from '../../individual/silkscreen/is-pcb-silkscreen';
import { flipPCBSilkscreen } from '../../individual/silkscreen/operations/transform/flip-pcb-silkscreen';
import { isPCBSolderMask } from '../../individual/solder-mask/is-pcb-solder-mask';
import { flipPCBSolderMask } from '../../individual/solder-mask/operations/transform/flip-pcb-solder-mask';
import { isPCBSolderPaste } from '../../individual/solder-paste/is-pcb-solder-paste';
import { flipPCBSolderPaste } from '../../individual/solder-paste/operations/transform/flip-pcb-solder-paste';

export function flipPCBPart<GPCBPart extends IPCBPart>(
  part: GPCBPart,
  around: number,
): GPCBPart {
  if (isPCBCopper(part)) {
    return flipPCBCopper(part, around) as GPCBPart;
  } else if (isPCBSolderMask(part)) {
    return flipPCBSolderMask(part, around) as GPCBPart;
  } else if (isPCBSolderPaste(part)) {
    return flipPCBSolderPaste(part, around) as GPCBPart;
  } else if (isPCBSilkscreen(part)) {
    return flipPCBSilkscreen(part, around) as GPCBPart;
  } else if (isPCBHole(part)) {
    return flipPCBHole(part, around) as GPCBPart;
  } else if (isPCBComponent(part)) {
    return flipPCBComponent(part, around) as GPCBPart;
  } else if (isPCBConnectionPoint(part)) {
    return flipPCBConnectionPoint(part, around) as GPCBPart;
  } else {
    throwUnsupportedPCBPart(part);
  }
}

export function flipPCBParts(
  parts: IPCBPart[],
  around: number = 0,
): IPCBPart[] {
  for (let i = 0, l = parts.length; i < l; i++) {
    flipPCBPart(parts[i], around);
  }
  return parts;
}
