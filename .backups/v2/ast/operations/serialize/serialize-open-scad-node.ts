import { isCubeNode } from '../../nodes/shapes/3d/cube/cube-node.ts';
import type { GenericOpenScadNode } from '../../nodes/open-scad-node.ts';
import { serializeCubeNode } from '../../nodes/shapes/3d/cube/operations/serialize/serialize-cube-node.ts';
import { isConeNode } from '../../nodes/shapes/3d/cone/cone-node.ts';
import { serializeConeNode } from '../../nodes/shapes/3d/cone/operations/serialize/serialize-cone-node.ts';
import { isSphereNode } from '../../nodes/shapes/3d/sphere/sphere-node.ts';
import { serializeSphereNode } from '../../nodes/shapes/3d/sphere/operations/serialize/serialize-sphere-node.ts';
import { isTranslateNode } from '../../nodes/transformations/translate/translate-node.ts';
import { serializeTranslateNode } from '../../nodes/transformations/translate/operations/serialize/serialize-translate-node.ts';
import { isUnionNode } from '../../nodes/modeling/union/union-node.ts';
import { serializeUnionNode } from '../../nodes/modeling/union/operations/serialize/serialize-union-node.ts';
import { serializeIntersectionNode } from '../../nodes/modeling/intersection/operations/serialize/serialize-intersection-node.ts';
import { serializeDifferenceNode } from '../../nodes/modeling/difference/operations/serialize/serialize-difference-node.ts';
import { isIntersectionNode } from '../../nodes/modeling/intersection/intersection-node.ts';
import { isDifferenceNode } from '../../nodes/modeling/difference/difference-node.ts';
import { isColorNode } from '../../nodes/transformations/color/color-node.ts';
import { serializeColorNode } from '../../nodes/transformations/color/operations/serialize/serialize-color-node.ts';

export function serializeOpenScadNode(input: GenericOpenScadNode): string {
  // shapes
  if (isCubeNode(input)) {
    return serializeCubeNode(input);
  } else if (isConeNode(input)) {
    return serializeConeNode(input);
  } else if (isSphereNode(input)) {
    return serializeSphereNode(input);
    // transformations
  } else if (isTranslateNode(input)) {
    return serializeTranslateNode(input);
  } else if (isColorNode(input)) {
    return serializeColorNode(input);
    // modeling
  } else if (isUnionNode(input)) {
    return serializeUnionNode(input);
  } else if (isDifferenceNode(input)) {
    return serializeDifferenceNode(input);
  } else if (isIntersectionNode(input)) {
    return serializeIntersectionNode(input);
  } else {
    throw new Error(`Unknown open-scad node type: ${input.$type}`);
  }
}
