import type { GenericOpenScadNode, OpenScadNode } from '../../open-scad-node.ts';

/**
 * Represents an intersection between many shapes.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling#intersection
 */
export interface IntersectionNode extends OpenScadNode<'intersection'> {
  readonly children: readonly GenericOpenScadNode[];
}

export function isIntersectionNode(input: GenericOpenScadNode): input is IntersectionNode {
  return input.$type === 'intersection';
}
