import type { GenericOpenScadNode, OpenScadNode } from '../../../open-scad-node.ts';
import type { Vector3d } from '../../../base/vector-3d/vector-3d.ts';

/**
 * Represents a cube.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cube
 */
export interface CubeNode extends OpenScadNode<'cube'> {
  readonly size: Vector3d;
  readonly center?: boolean;
}

export function isCubeNode(input: GenericOpenScadNode): input is CubeNode {
  return input.$type === 'cube';
}
