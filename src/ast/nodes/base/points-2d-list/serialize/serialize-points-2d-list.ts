import type { Points2dList } from '../points-2d-list.ts';
import { serializePointsList } from '../../numbers-list/serialize/serialize-points-list.ts';


/**
 * Serializes a list of 2D points into a string representation (open-scad format).
 *
 * @param {Points2dList} list - The list of 2D points to serialize, where each point is represented as a pair of coordinates.
 * @return {string} A string representation of the serialized 2D points list.
 */
export function serializePoints2dList(
  list: Points2dList,
): string {
  return serializePointsList(list, 2);
}
