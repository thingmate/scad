import type { ConeNode } from './cone-node.ts';

export type ConeOptions = Omit<ConeNode, '$type'>;

/**
 * Creates a cone.
 */
export function cone(options: ConeOptions): ConeNode {
  return {
    ...options,
    $type: 'cone',
  };
}
