import type { PolyhedronNode } from './polyhedron-node.ts';

export type PolyhedronOptions = Omit<PolyhedronNode, '$type'>;

/**
 * Creates a polyhedron.
 */
export function polyhedron(options: PolyhedronOptions): PolyhedronNode {
  return {
    ...options,
    $type: 'polyhedron',
  };
}
