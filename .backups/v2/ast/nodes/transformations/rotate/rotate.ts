import type { RotateNode } from './rotate-node.ts';
import type { GenericOpenScadNode } from '../../open-scad-node.ts';
import { isVector3d, type Vector3d } from '../../base/vector-3d/vector-3d.ts';

export type RotateOptions = Omit<RotateNode, '$type' | 'children'> | Vector3d; /* angle */

/**
 * Creates a rotation operation.
 */
export function rotate(input: RotateOptions, children: readonly GenericOpenScadNode[]): RotateNode {
  let angle: Vector3d | number;
  let vector: Vector3d | undefined;

  if (isVector3d(input)) {
    angle = input;
  } else {
    angle = (input as Omit<RotateNode, '$type' | 'children'>).angle;
    vector = (input as Omit<RotateNode, '$type' | 'children'>).vector;
  }

  return {
    $type: 'rotate',
    angle,
    vector,
    children,
  };
}
