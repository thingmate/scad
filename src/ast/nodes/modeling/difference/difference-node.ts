import type { GenericOpenScadNode, OpenScadNode } from '../../open-scad-node.ts';

/**
 * Represents a difference between many shapes.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling#difference
 */
export interface DifferenceNode extends OpenScadNode<'difference'> {
  readonly children: readonly GenericOpenScadNode[];
}

export function isDifferenceNode(input: GenericOpenScadNode): input is DifferenceNode {
  return input.$type === 'difference';
}
