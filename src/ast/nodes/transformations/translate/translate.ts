import type { TranslateNode } from './translate-node.ts';
import type { Vector3d } from '../../base/vector-3d/vector-3d.ts';
import type { GenericOpenScadNode } from '../../open-scad-node.ts';

/**
 * Creates a translation operation.
 */
export function translate(
  vector: Vector3d,
  children: readonly GenericOpenScadNode[],
): TranslateNode {
  return {
    $type: 'translate',
    vector,
    children,
  };
}
