import { vec2 } from 'gl-matrix';
import { NULL_VEC2 } from '../../../../misc/math/null-vec2';
import { IPCBPart, IPCBParts } from '../../individual/pcb-part.type';
import { rotatePCBPart } from './rotate-pcb-part';
import { scalePCBPart, scalePCBParts } from './scale-pcb-part';
import { translatePCBPart } from './translate-pcb-part';

export function placePCBPart<GPCBPart extends IPCBPart>(
  part: GPCBPart,
  x: number,
  y: number,
  rotation: number = 0,
  scale: number = 1,
): GPCBPart {
  if (scale !== 1) {
    scalePCBPart(part, scale, NULL_VEC2);
  }
  if (rotation !== 0) {
    rotatePCBPart(part, rotation, NULL_VEC2);
  }
  translatePCBPart(part, vec2.fromValues(x, y));
  return part;
}

export function placePCBParts(
  parts: IPCBParts,
  x: number,
  y: number,
  rotation?: number,
  scale?: number,
): IPCBPart[] {
  for (let i = 0, l = parts.length; i < l; i++) {
    placePCBPart(parts[i], x, y, rotation, scale);
  }
  return parts;
}
