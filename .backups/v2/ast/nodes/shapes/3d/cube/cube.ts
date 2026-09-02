import type { CubeNode } from './cube-node.ts';
import type { Vector3d } from '../../../base/vector-3d/vector-3d.ts';

export type CubeOptions = Omit<CubeNode, '$type'> | Vector3d; /* size */

/**
 * Creates a cube.
 */
export function cube(input: CubeOptions): CubeNode {
  let size: Vector3d;
  let center: boolean | undefined;

  if (Array.isArray(input)) {
    size = input as Vector3d;
  } else {
    size = (input as Omit<CubeNode, '$type'>).size;
    center = (input as Omit<CubeNode, '$type'>).center;
  }

  return {
    $type: 'cube',
    size,
    center,
  };
}
