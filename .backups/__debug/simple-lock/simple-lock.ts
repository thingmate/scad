import { Lines } from '../../../src/misc/lines/lines.ts';
import { cube } from '../../../src/open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../../src/open-scad/build/primitives/3d/cylinder.ts';
import { rotate } from '../../../src/open-scad/build/transformations/rotate.ts';
import { translate } from '../../../src/open-scad/build/transformations/translate.ts';
import { EPSILON } from '../../../src/math/epsilon.ts';
import { diameter } from '../../../src/math/units/length/circle/diameter.ts';
import { difference } from '../../../src/open-scad/build/modeling/difference.ts';
import { union } from '../../../src/open-scad/build/modeling/union.ts';
import { debug } from '../../../src/open-scad/build/modifiers/debug.ts';

/*---*/

/*---*/

export interface ISimpleLockFixBlockOptions {
  fixBlockX: number;
  fixBlockY: number;
  fixBlockZ: number;
  fixBlockFixScrewRadius: number;
  fixBlockFixScrewBorderOffset: number;
  fixBlockLockTotalHeight: number;
  lockScrewRadius: number;
  lockWidth: number;
}

export function simpleLockFixBlock(
  {
    fixBlockX,
    fixBlockY,
    fixBlockZ,
    fixBlockFixScrewRadius,
    fixBlockFixScrewBorderOffset,
    lockScrewRadius,
    fixBlockLockTotalHeight,
    lockWidth,
  }: ISimpleLockFixBlockOptions,
): Lines {
  const extra: number = 1;

  const fixScrew = () => {
    return translate([fixBlockX * 0.5 - fixBlockFixScrewBorderOffset, 0, 0], [
      cylinder({
        radius: fixBlockFixScrewRadius,
        height: fixBlockZ + extra * 2,
      }),
    ]);
  };

  const lockScrew = () => {
    return translate([0, 0, -extra], [
      cylinder({
        radius: lockScrewRadius,
        height: fixBlockLockTotalHeight * extra * 2,
      }),
    ]);
  };

  const lockScrewBase = () => {
    return translate([0, 0, EPSILON], [
      cylinder({
        radius: diameter(lockWidth),
        height: fixBlockLockTotalHeight - EPSILON,
      }),
    ]);
  };

  return difference([
    union([
      translate([fixBlockX * -0.5, fixBlockY * -0.5, 0], [
        cube({
          size: [fixBlockX, fixBlockY, fixBlockZ],
        }),
      ]),
      lockScrewBase(),
    ]),
    debug(
      union([
        rotate([0, 0, 0], [
          fixScrew(),
        ]),
        rotate([0, 0, 180], [
          fixScrew(),
        ]),
        lockScrew(),
      ]),
    ),
  ]);
}

/*---*/

export interface ISimpleLockLockOptions {
  lockScrewRadius: number;
  lockWidth: number;
  lockLength: number;
  lockHeight: number;
  fixBlockLockTotalHeight: number;
}

export function simpleLockLock(
  {
    lockScrewRadius,
    lockWidth,
    lockLength,
    lockHeight,
    fixBlockLockTotalHeight,
  }: ISimpleLockLockOptions,
): Lines {
  const extra: number = 1;

  return translate([0, 0, fixBlockLockTotalHeight + 0.5], [
    difference([
      union([
        translate([lockWidth * -0.5, 0, 0], [
          cube({
            size: [lockWidth, lockLength, lockHeight],
          }),
        ]),

        cylinder({
          radius: diameter(lockWidth),
          height: lockHeight,
        }),
      ]),
      debug(
        translate([0, 0, -extra], [
          cylinder({
            radius: lockScrewRadius,
            height: lockHeight * extra * 2,
          }),
        ]),
      ),
    ]),
  ]);
}
