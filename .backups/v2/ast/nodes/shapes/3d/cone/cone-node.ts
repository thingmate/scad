import type { GenericOpenScadNode, OpenScadNode } from '../../../open-scad-node.ts';

/**
 * Represents a cone.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cylinder
 */
export interface ConeNode extends OpenScadNode<'cone'> {
  readonly height: number;
  readonly radiusBottom: number;
  readonly radiusTop: number;
  readonly center?: boolean;
  readonly fragmentAngle?: number;
  readonly fragmentSize?: number;
  readonly fragmentNumber?: number;
}

export function isConeNode(input: GenericOpenScadNode): input is ConeNode {
  return input.$type === 'cone';
}
