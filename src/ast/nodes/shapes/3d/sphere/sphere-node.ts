import type { GenericOpenScadNode, OpenScadNode } from '../../../open-scad-node.ts';

/**
 * Represents a sphere.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#sphere
 */
export interface SphereNode extends OpenScadNode<'sphere'> {
  readonly radius: number;
  readonly fragmentAngle?: number;
  readonly fragmentSize?: number;
  readonly fragmentNumber?: number;
}

export function isSphereNode(input: GenericOpenScadNode): input is SphereNode {
  return input.$type === 'sphere';
}
