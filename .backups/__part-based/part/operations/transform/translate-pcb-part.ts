import { ReadonlyVec2 } from 'gl-matrix';
import { throwUnsupportedPCBPart } from '../../../shared/throw-unsupported-pcb-part';
import { isPCBComponent } from '../../individual/component/is-pcb-component';
import { translatePCBComponent } from '../../individual/component/operations/transform/translate-pcb-component';
import { isPCBConnectionPoint } from '../../individual/connection-point/is-pcb-connection-point';
import { translatePCBConnectionPoint } from '../../individual/connection-point/operations/transform/translate-pcb-connection-point';
import { isPCBCopper } from '../../individual/copper/is-pcb-copper';
import { translatePCBCopper } from '../../individual/copper/operations/transform/translate-pcb-copper';
import { isPCBHole } from '../../individual/hole/is-pcb-hole';
import { translatePCBHole } from '../../individual/hole/operations/transform/translate-pcb-hole';
import { IPCBPart, IPCBParts } from '../../individual/pcb-part.type';
import { isPCBSilkscreen } from '../../individual/silkscreen/is-pcb-silkscreen';
import { translatePCBSilkscreen } from '../../individual/silkscreen/operations/transform/translate-pcb-silkscreen';
import { isPCBSolderMask } from '../../individual/solder-mask/is-pcb-solder-mask';
import { translatePCBSolderMask } from '../../individual/solder-mask/operations/transform/translate-pcb-solder-mask';
import { isPCBSolderPaste } from '../../individual/solder-paste/is-pcb-solder-paste';
import { translatePCBSolderPaste } from '../../individual/solder-paste/operations/transform/translate-pcb-solder-paste';

export function translatePCBPart<GPCBPart extends IPCBPart>(
  part: GPCBPart,
  translation: ReadonlyVec2,
): GPCBPart {
  if (isPCBCopper(part)) {
    return translatePCBCopper(part, translation) as GPCBPart;
  } else if (isPCBSolderMask(part)) {
    return translatePCBSolderMask(part, translation) as GPCBPart;
  } else if (isPCBSolderPaste(part)) {
    return translatePCBSolderPaste(part, translation) as GPCBPart;
  } else if (isPCBSilkscreen(part)) {
    return translatePCBSilkscreen(part, translation) as GPCBPart;
  } else if (isPCBHole(part)) {
    return translatePCBHole(part, translation) as GPCBPart;
  } else if (isPCBComponent(part)) {
    return translatePCBComponent(part, translation) as GPCBPart;
  } else if (isPCBConnectionPoint(part)) {
    return translatePCBConnectionPoint(part, translation) as GPCBPart;
  } else {
    throwUnsupportedPCBPart(part);
  }
}

export function translatePCBParts(
  parts: IPCBParts,
  translation: ReadonlyVec2,
): IPCBPart[] {
  for (let i = 0, l = parts.length; i < l; i++) {
    translatePCBPart(parts[i], translation);
  }
  return parts;
}
