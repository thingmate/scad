import type { GenericOpenScadNode, OpenScadNode } from '../../../open-scad-node.ts';
import type { NumbersList } from '../../../base/numbers-list/numbers-list.ts';
import type { Points3dList } from '../../../base/points-3d-list/points-3d-list.ts';

/**
 * Represents a polyhedron.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#polyhedron
 */
export interface PolyhedronNode extends OpenScadNode<'polyhedron'> {
  readonly points: Points3dList;
  readonly faces: readonly NumbersList[]; // all faces looked from outside must be clockwise
  readonly convexity?: number;
}

export function isPolyhedronNode(input: GenericOpenScadNode): input is PolyhedronNode {
  return input.$type === 'polyhedron';
}
