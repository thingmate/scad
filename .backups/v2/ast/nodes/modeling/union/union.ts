import type { UnionNode } from './union-node.ts';
import type { GenericOpenScadNode } from '../../open-scad-node.ts';

/**
 * Creates a union.
 */
export function union(children: readonly GenericOpenScadNode[]): UnionNode {
  return {
    $type: 'union',
    children,
  };
}
