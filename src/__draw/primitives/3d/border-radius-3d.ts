import { Lines } from '../../../misc/lines/lines.ts';
import { DEG_TO_RAD } from '../../../math/units/angle/deg-to-rad.ts';
import { linearExtrude } from '../../transformations/linear-extrude.ts';
import { polygon } from '../2d/polygon.ts';
import { EPSILON } from '../../../math/epsilon.ts';

export interface IBorderRadius3dOptions {
  radius: number;
  angle: number;
  length: number;
  thickness?: number;
  fragmentNumber?: number;
}

/**
 * @deprecated
 */
export function borderRadius3d(
  {
    radius,
    angle,
    length,
    thickness = EPSILON,
    fragmentNumber = 20,
  }: IBorderRadius3dOptions,
): Lines {
  const angle_rad: number = angle * DEG_TO_RAD;
  const x: number = radius;
  const y: number = Math.tan(angle_rad / 2) * radius;

  return linearExtrude({
    height: length,
  }, [
    polygon({
      points: [
        thickness, thickness,
        ...Array.from({ length: fragmentNumber }, (_, index: number): [number, number] => {
          const _angle: number = ((index / (fragmentNumber - 1)) * angle) * DEG_TO_RAD;
          return [Math.cos(_angle) * radius - x, Math.sin(_angle) * radius - y];
        }).flat(),
        thickness, thickness,
      ],
    }),
  ]);
}
