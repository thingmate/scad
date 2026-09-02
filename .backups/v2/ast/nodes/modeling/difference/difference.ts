import type { DifferenceNode } from './difference-node.ts';
import type { GenericOpenScadNode } from '../../open-scad-node.ts';

/**
 * Creates a difference.
 */
export function difference(children: readonly GenericOpenScadNode[]): DifferenceNode {
  return {
    $type: 'difference',
    children,
  };
}
