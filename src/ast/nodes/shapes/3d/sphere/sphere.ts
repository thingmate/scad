import type { SphereNode } from './sphere-node.ts';

export type SphereOptions = Omit<SphereNode, '$type'>;

/**
 * Creates a sphere.
 */
export function sphere(options: SphereOptions): SphereNode {
  return {
    ...options,
    $type: 'sphere',
  };
}
