import type { ConeNode } from '../cone/cone-node.ts';
import { cone, type ConeOptions } from '../cone/cone.ts';

export interface CylinderOptions extends Omit<ConeOptions, 'radiusBottom' | 'radiusTop'> {
  readonly height: number;
  readonly radius: number;
}

/**
 * Creates a cylinder.
 */
export function cylinder({ radius, ...options }: CylinderOptions): ConeNode {
  return cone({
    ...options,
    radiusTop: radius,
    radiusBottom: radius,
  });
}
