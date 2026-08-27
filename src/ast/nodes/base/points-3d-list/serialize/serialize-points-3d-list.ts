import type { Points3dList } from '../points-3d-list.ts';
import { serializePointsList } from '../../numbers-list/serialize/serialize-points-list.ts';


/**
 * Serializes a list of 3D points into a string representation (open-scad format).
 *
 * @param {Points3dList} list - The list of 3D points to serialize, where each point is represented as a 3-tuple of coordinates.
 * @return {string} A string representation of the serialized 2D points list.
 */
export function serializePoints3dList(
  list: Points3dList,
): string {
  return serializePointsList(list, 3);
}
