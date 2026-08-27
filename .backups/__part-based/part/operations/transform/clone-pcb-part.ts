import { throwUnsupportedPCBPart } from '../../../shared/throw-unsupported-pcb-part';
import { isPCBCopper } from '../../individual/copper/is-pcb-copper';
import { clonePCBCopper } from '../../individual/copper/operations/clone-pcb-copper';
import { isPCBHole } from '../../individual/hole/is-pcb-hole';
import { clonePCBHole } from '../../individual/hole/operations/clone-pcb-hole';
import { IPCBPart } from '../../individual/pcb-part.type';
import { isPCBSilkscreen } from '../../individual/silkscreen/is-pcb-silkscreen';
import { clonePCBSilkscreen } from '../../individual/silkscreen/operations/clone-pcb-siklscreen';
import { isPCBSolderMask } from '../../individual/solder-mask/is-pcb-solder-mask';
import { clonePCBSolderMask } from '../../individual/solder-mask/operations/clone-pcb-solder-mask';
import { isPCBSolderPaste } from '../../individual/solder-paste/is-pcb-solder-paste';
import { clonePCBSolderPaste } from '../../individual/solder-paste/operations/clone-pcb-solder-paste';

export function clonePCBPart<GPCBPart extends IPCBPart>(
  part: GPCBPart,
): GPCBPart {
  if (isPCBCopper(part)) {
    return clonePCBCopper(part) as GPCBPart;
  } else if (isPCBSolderMask(part)) {
    return clonePCBSolderMask(part) as GPCBPart;
  } else if (isPCBSolderPaste(part)) {
    return clonePCBSolderPaste(part) as GPCBPart;
  } else if (isPCBSilkscreen(part)) {
    return clonePCBSilkscreen(part) as GPCBPart;
  } else if (isPCBHole(part)) {
    return clonePCBHole(part) as GPCBPart;
  } else {
    throwUnsupportedPCBPart(part);
  }
}

export function clonePCBParts(
  parts: IPCBPart[],
): IPCBPart[] {
  return parts.map((part: IPCBPart): IPCBPart => {
    return clonePCBPart(part);
  });
}
