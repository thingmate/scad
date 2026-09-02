import type { GenericOpenScadNode, OpenScadNode } from '../../open-scad-node.ts';
import type { Vector3d } from '../../base/vector-3d/vector-3d.ts';

/**
 * Represents a rotation operation.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#rotate
 */
export interface RotateNode extends OpenScadNode<'rotate'> {
  readonly angle: number | Vector3d;
  readonly vector?: Vector3d;
  readonly children: readonly GenericOpenScadNode[];
}

export function isRotateNode(input: GenericOpenScadNode): input is RotateNode {
  return input.$type === 'rotate';
}
