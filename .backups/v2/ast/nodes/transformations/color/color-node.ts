import type { GenericOpenScadNode, OpenScadNode } from '../../open-scad-node.ts';
import type { Rgba } from '../../base/color/rgba.ts';

/**
 * Represents a color operation.
 *
 * @inheritDoc  https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#color
 */
export interface ColorNode extends OpenScadNode<'color'> {
  readonly color: Rgba;
  readonly children: readonly GenericOpenScadNode[];
}

export function isColorNode(input: GenericOpenScadNode): input is ColorNode {
  return input.$type === 'color';
}
