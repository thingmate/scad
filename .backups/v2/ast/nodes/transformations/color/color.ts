import type { ColorNode } from './color-node.ts';
import type { GenericOpenScadNode } from '../../open-scad-node.ts';
import type { Rgba } from '../../base/color/rgba.ts';

/**
 * Defines a color for a group of shapes.
 */
export function color(color: Rgba, children: readonly GenericOpenScadNode[]): ColorNode {
  return {
    $type: 'color',
    color,
    children,
  };
}
