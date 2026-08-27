import type { IntersectionNode } from './intersection-node.ts';
import type { GenericOpenScadNode } from '../../open-scad-node.ts';

/**
 * Creates an intersection.
 */
export function intersection(children: readonly GenericOpenScadNode[]): IntersectionNode {
  return {
    $type: 'intersection',
    children,
  };
}
