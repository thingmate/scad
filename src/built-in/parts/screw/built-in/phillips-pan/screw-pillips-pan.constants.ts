import { Lines } from '../../../../../misc/lines/lines.ts';
import { SCREW_M3, SCREW_M4 } from '../../body/screw-body.constants.ts';
import { PHILLIPS_PAN_HEAD_M3, PHILLIPS_PAN_HEAD_M4 } from '../../head/phillips-pan/screw-pillips-pan-head.constants.ts';
import { ScrewPhillipsPanOptions, screwPhillipsPan } from './screw-phillips-pan.ts';

export type IScrewPhillipsPanAutoOptions =
  Omit<ScrewPhillipsPanOptions, 'body'>
  & {
  body: Omit<ScrewPhillipsPanOptions['body'], 'height'>
}

export const PHILLIPS_PAN_M3: IScrewPhillipsPanAutoOptions = {
  head: PHILLIPS_PAN_HEAD_M3,
  body: SCREW_M3,
};

export const PHILLIPS_PAN_M4: IScrewPhillipsPanAutoOptions = {
  head: PHILLIPS_PAN_HEAD_M4,
  body: SCREW_M4,
};

export function screwPhillipsPanAuto(
  options: IScrewPhillipsPanAutoOptions,
  height: number,
): Lines {
  return screwPhillipsPan({
    ...options,
    body: {
      ...options.body,
      height,
    },
  });
}
