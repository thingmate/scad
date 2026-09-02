import { RAD_TO_TURN } from './constants.ts';

/**
 * Converts the given angle from radians to turns.
 *
 * @param {number} angleInRadians - The angle in radians to be converted.
 * @return {number} The angle converted to radians.
 */
export function rad(angleInRadians: number): number {
  return angleInRadians * RAD_TO_TURN;
}
