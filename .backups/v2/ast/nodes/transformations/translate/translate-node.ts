import type { GenericOpenScadNode, OpenScadNode } from '../../open-scad-node.ts';
import type { Vector3d } from '../../base/vector-3d/vector-3d.ts';

/**
 * Represents a translation operation.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#translate
 */
export interface TranslateNode extends OpenScadNode<'translate'> {
  readonly vector: Vector3d;
  readonly children: readonly GenericOpenScadNode[];
}

export function isTranslateNode(input: GenericOpenScadNode): input is TranslateNode {
  return input.$type === 'translate';
}
