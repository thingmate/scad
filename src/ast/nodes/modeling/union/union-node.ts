import type { GenericOpenScadNode, OpenScadNode } from '../../open-scad-node.ts';

/**
 * Represents a union between many shapes.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling#union
 */
export interface UnionNode extends OpenScadNode<'union'> {
  readonly children: readonly GenericOpenScadNode[];
}

export function isUnionNode(input: GenericOpenScadNode): input is UnionNode {
  return input.$type === 'union';
}
