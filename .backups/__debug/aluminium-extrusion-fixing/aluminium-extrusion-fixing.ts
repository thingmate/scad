import { Lines } from '../../../src/misc/lines/lines.ts';
import { repeat } from '../../../src/open-scad/build/others/repeat.ts';
import { polygon } from '../../../src/open-scad/build/primitives/2d/polygon.ts';
import { cube } from '../../../src/open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../../src/open-scad/build/primitives/3d/cylinder.ts';
import { polyhedron } from '../../../src/open-scad/build/primitives/3d/polyhedron.ts';
import { linearExtrude } from '../../../src/open-scad/build/transformations/linear-extrude.ts';
import { mirror } from '../../../src/open-scad/build/transformations/mirror.ts';
import { rotate } from '../../../src/open-scad/build/transformations/rotate.ts';
import { translate } from '../../../src/open-scad/build/transformations/translate.ts';
import { union } from '../../../src/open-scad/build/modeling/union.ts';
import { difference } from '../../../src/open-scad/build/modeling/difference.ts';
import { debug } from '../../../src/open-scad/build/modifiers/debug.ts';
import { none } from '../../../src/open-scad/build/modifiers/none.ts';

/*-------------NAMING-----------------*/

// [X|Y|Z][p(ositive)|n(egative)|c(rossing)|v(oid)]

/*-------------------------------------*/

export interface IAluminiumExtrusionRightAngleFixingPlateOptions {
  extrusionSide: number;
  extrusionCoverLength: number;
  extrusionCoverThickness: number;
  reinforcementLength: number;
}

export function aluminiumExtrusionRightAngleFixingPlate(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
    reinforcementLength,
  }: IAluminiumExtrusionRightAngleFixingPlateOptions,
): Lines {
  const a: number = extrusionCoverThickness + (extrusionSide * 0.5);
  const b: number = a + extrusionCoverLength;
  const c: number = a + reinforcementLength;

  return polygon({
    points: [
      -a,
      -a,
      b,
      -a,
      b,
      a,
      c,
      a,

      a,
      c,
      a,
      b,
      -a,
      b,
    ],
  });
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcPlentyOptions
  extends IAluminiumExtrusionRightAngleFixingPlateOptions {
  extrusionCoverThickness: number;
  extrusionSide: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZcPlenty(
  {
    extrusionCoverThickness,
    extrusionSide,
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcPlentyOptions,
): Lines {
  const height: number = (extrusionCoverThickness * 2) + extrusionSide;
  return linearExtrude({
    height,
    center: true,
  }, [
    aluminiumExtrusionRightAngleFixingPlate({
      ...options,
      extrusionCoverThickness,
      extrusionSide,
    }),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpBlockOptions {
  extrusionSide: number;
  extrusionCoverLength: number;
  extrusionCoverThickness: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpBlock(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
  }: IAluminiumExtrusionRightAngleFixingBlockXpBlockOptions,
): Lines {
  const x: number = extrusionCoverThickness + extrusionSide +
    extrusionCoverThickness + extrusionCoverLength;
  const y: number = extrusionCoverThickness + extrusionSide +
    extrusionCoverThickness;
  const z: number = y;

  const t: number = y * -0.5;

  return translate([t, t, t], [
    cube({
      size: [x, y, z],
    }),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions {
  extrusionSide: number;
  extrusionCoverThickness: number;
  reinforcementLength: number;
  extraReinforcementLength: number;
}

export function aluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemove(
  {
    extrusionSide,
    extrusionCoverThickness,
    reinforcementLength,
    extraReinforcementLength,
  }: IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions,
): Lines {
  const a: number = extrusionCoverThickness + (extrusionSide * 0.5);
  const b: number = a + extraReinforcementLength;
  const c: number = a + reinforcementLength + 1;

  return polygon({
    points: [
      b,
      a,
      c,
      a,

      a,
      c,
      a,
      b,
    ],
  });
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementRemoveOptions
  extends
    IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions {
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementRemove(
  {
    extrusionSide,
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementRemoveOptions,
): Lines {
  return linearExtrude({
    height: extrusionSide,
    center: true,
  }, [
    aluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemove({
      ...options,
      extrusionSide,
    }),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZpExtraReinforcementAngleBlockOptions {
  extrusionSide: number;
  extrusionCoverThickness: number;
  extraReinforcementLength: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZpExtraReinforcementAngleBlock(
  {
    extrusionSide,
    extrusionCoverThickness,
    extraReinforcementLength,
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZpExtraReinforcementAngleBlockOptions,
): Lines {
  const c: number = extrusionCoverThickness + (extrusionSide * 0.5);
  const a: number = c - 1;
  const b: number = c + extraReinforcementLength;

  return polyhedron({
    points: [
      a,
      a,
      a,
      b,
      a,
      a,
      a,
      b,
      a,
      a,
      a,
      b,
    ],
    faces: [
      [0, 1, 2], // xy plane
      [0, 3, 1], // xz plane
      [0, 2, 3], // yz plane
      [1, 3, 2],
    ],
  });
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZpRemoveCornerOptions {
  extrusionSide: number;
  extrusionCoverThickness: number;
  removeAngleCornerSize: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZpRemoveCorner(
  {
    extrusionSide,
    extrusionCoverThickness,
    removeAngleCornerSize,
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZpRemoveCornerOptions,
): Lines {
  const c: number = extrusionCoverThickness + (extrusionSide * 0.5);
  const a: number = -1 - c;
  const b: number = removeAngleCornerSize - c;

  return polyhedron({
    points: [
      a,
      a,
      a,
      b,
      a,
      a,
      a,
      b,
      a,
      a,
      a,
      b,
    ],
    faces: [
      [0, 1, 2], // xy plane
      [0, 3, 1], // xz plane
      [0, 2, 3], // yz plane
      [1, 3, 2],
    ],
  });
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemoveOptions
  extends
    IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions {
  extraReinforcementAttachHoleOffset: number;
  extraReinforcementAttachHoleRadius: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemove(
  {
    extrusionSide,
    extrusionCoverThickness,
    extraReinforcementAttachHoleOffset,
    extraReinforcementAttachHoleRadius,
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemoveOptions,
): Lines {
  const extraReinforcementAttachHoleHeight: number =
    (extrusionCoverThickness * 2) + extrusionSide + 1;
  const a: number = extrusionCoverThickness + (extrusionSide * 0.5) +
    extraReinforcementAttachHoleOffset;

  return union([
    aluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementRemove({
      ...options,
      extrusionSide,
      extrusionCoverThickness,
    }),
    translate([a, a, 0], [
      cylinder({
        radius: extraReinforcementAttachHoleRadius,
        height: extraReinforcementAttachHoleHeight,
        center: true,
      }),
    ]),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove {
  extrusionSide: number;
  extrusionCoverLength: number;
  extrusionCoverThickness: number;
  extrusionAttachHoleRadius: number;
  extrusionAttachHoleOffset: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
    extrusionAttachHoleRadius,
    extrusionAttachHoleOffset,
  }: IAluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove,
): Lines {
  const a: number = extrusionSide * 0.5;
  const b: number = extrusionCoverThickness + a;
  const c: number = b + extrusionAttachHoleOffset;
  const d: number = b + extrusionCoverLength - extrusionAttachHoleOffset;

  const screwHole = (): Lines => {
    const offset: number = (extrusionCoverThickness * 0.5) +
      (extrusionSide * 0.5);
    const screwHoleHeight: number = offset * 1.5;
    // const screwHoleHeight: number = ((extrusionCoverThickness * 2) + extrusionSide) * 2;

    return translate([0, -offset, 0], [
      rotate([90, 0, 0], [
        cylinder({
          radius: extrusionAttachHoleRadius,
          height: screwHoleHeight,
          center: true,
        }),
      ]),
    ]);
  };

  const screwHolesAround = (): Lines => {
    return repeat(4, (index: number): Lines => {
      return rotate([90 * index, 0, 0], [
        screwHole(),
      ]);
    });
  };

  return union([
    translate([b, -a, -a], [
      cube({
        size: [extrusionCoverLength * 2, extrusionSide, extrusionSide],
      }),
    ]),
    translate([c, 0, 0], [
      screwHolesAround(),
    ]),
    translate([d, 0, 0], [
      screwHolesAround(),
    ]),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockZcExtrusionRemove {
  extrusionSide: number;
  extrusionCoverThickness: number;
  extrusionAttachHoleRadius: number;
}

export function aluminiumExtrusionRightAngleFixingBlockZcExtrusionRemove(
  {
    extrusionSide,
    extrusionCoverThickness,
    extrusionAttachHoleRadius,
  }: IAluminiumExtrusionRightAngleFixingBlockZcExtrusionRemove,
): Lines {
  const extrusionHeight: number =
    ((extrusionCoverThickness * 2) + extrusionSide) * 4;

  const screwHole = (): Lines => {
    const offset: number = (extrusionCoverThickness * 0.5) +
      (extrusionSide * 0.5);
    const screwHoleHeight: number = offset * 2;

    return translate([0, -offset, 0], [
      rotate([90, 0, 0], [
        cylinder({
          radius: extrusionAttachHoleRadius,
          height: screwHoleHeight,
          center: true,
        }),
      ]),
    ]);
  };

  return union([
    cube({
      size: [extrusionSide, extrusionSide, extrusionHeight],
      center: true,
    }),
    rotate([0, 0, 0], [
      screwHole(),
    ]),
    rotate([0, 0, 90], [
      screwHole(),
    ]),
    rotate([0, 0, 180], [
      screwHole(),
    ]),
    rotate([0, 0, 270], [
      screwHole(),
    ]),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcOptions extends
  //
  IAluminiumExtrusionRightAngleFixingPlateOptions,
  IAluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove,
  IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions,
  IAluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemoveOptions,
  IAluminiumExtrusionRightAngleFixingBlockZcExtrusionRemove//
{
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZc(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcOptions,
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingBlockXpYpZcPlenty(options),
    debug(
      union([
        // extrusion remove
        union([
          rotate([0, 0, 0], [ // x
            aluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove(options),
          ]),
          rotate([0, 0, 90], [ // y
            aluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove(options),
          ]),
          aluminiumExtrusionRightAngleFixingBlockZcExtrusionRemove(options), // z
        ]),
        // extra reinforcement
        aluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemove(
          options,
        ),
      ]),
    ),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart1PlateRemoveOptions {
  extrusionSide: number;
  extrusionCoverLength: number;
  extrusionCoverThickness: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZcPart1PlateRemove(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart1PlateRemoveOptions,
): Lines {
  const extra: number = 1;

  const l_x: number = extrusionCoverLength + (extrusionCoverThickness * 2) +
    extrusionSide + (extra * 2);
  const t_x: number =
    -(extrusionCoverThickness + (extrusionSide * 0.5) + extra);

  const l_y: number = extrusionCoverThickness + extra;
  const t_y: number =
    -(extrusionCoverThickness + (extrusionSide * 0.5) + extra);

  const l_z: number = (extrusionCoverThickness * 2) + extrusionSide +
    (extra * 2);
  const t_z: number =
    -(extrusionCoverThickness + (extrusionSide * 0.5) + extra);

  return translate([t_x, t_y + 0.01, t_z], [
    cube({ size: [l_x, l_y, l_z], center: false }),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart1RemoveOptions
  extends
    //
    IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart1PlateRemoveOptions//
{
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZcPart1Remove(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart1RemoveOptions,
): Lines {
  return union([
    // xy extrusion remove
    rotate([0, 0, 0], [ // x
      aluminiumExtrusionRightAngleFixingBlockXpYpZcPart1PlateRemove(options),
    ]),
    rotate([0, 0, -90], [ // y
      mirror([1, 0, 0], [
        aluminiumExtrusionRightAngleFixingBlockXpYpZcPart1PlateRemove(options),
      ]),
    ]),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart1Options
  extends
    //
    IAluminiumExtrusionRightAngleFixingBlockXpYpZcOptions,
    IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart1RemoveOptions//
{
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZcPart1(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart1Options,
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingBlockXpYpZc(options),
    none(
      aluminiumExtrusionRightAngleFixingBlockXpYpZcPart1Remove(options),
    ),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart2RemoveOptions {
  extrusionSide: number;
  extrusionCoverLength: number;
  extrusionCoverThickness: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZcPart2Remove(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart2RemoveOptions,
): Lines {
  const extra: number = 1;

  const l_x: number = extrusionCoverLength + extrusionCoverThickness +
    extrusionSide + extra;
  const t_x: number = -(extrusionSide * 0.5);

  const l_z: number = (extrusionCoverThickness * 2) + extrusionSide +
    (extra * 2);
  const t_z: number =
    -(extrusionCoverThickness + (extrusionSide * 0.5) + extra);

  return translate([t_x, t_x, t_z], [
    cube({ size: [l_x, l_x, l_z], center: false }),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart2Options
  extends
    //
    IAluminiumExtrusionRightAngleFixingBlockXpYpZcOptions,
    IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart2RemoveOptions//
{
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZcPart2(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZcPart2Options,
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingBlockXpYpZc(options),
    none(
      aluminiumExtrusionRightAngleFixingBlockXpYpZcPart2Remove(options),
    ),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYpZpOptions extends
  //
  IAluminiumExtrusionRightAngleFixingPlateOptions,
  IAluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove,
  IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions,
  IAluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemoveOptions,
  IAluminiumExtrusionRightAngleFixingBlockXpYpZpRemoveCornerOptions//
{
}

export function aluminiumExtrusionRightAngleFixingBlockXpYpZp(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYpZpOptions,
): Lines {
  return difference([
    union([
      rotate([0, 0, 0], [ // xy plan
        aluminiumExtrusionRightAngleFixingBlockXpYpZcPlenty(options),
      ]),
      rotate([90, 0, 0], [ // xz plan
        aluminiumExtrusionRightAngleFixingBlockXpYpZcPlenty(options),
      ]),
      rotate([0, -90, 0], [ // yz plan
        aluminiumExtrusionRightAngleFixingBlockXpYpZcPlenty(options),
      ]),
      aluminiumExtrusionRightAngleFixingBlockXpYpZpExtraReinforcementAngleBlock(
        options,
      ),
    ]),
    none(
      union([
        // extrusion remove
        union([
          rotate([0, 0, 0], [ // x
            aluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove(options),
          ]),
          rotate([0, 0, 90], [ // y
            aluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove(options),
          ]),
          rotate([0, -90, 0], [ // z
            aluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove(options),
          ]),
        ]),
        // extra reinforcement
        union([
          rotate([0, 0, 0], [ // xy plan
            aluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemove(
              options,
            ),
          ]),
          rotate([90, 0, 0], [ // xz plan
            aluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemove(
              options,
            ),
          ]),
          rotate([0, -90, 0], [ // yz plan
            aluminiumExtrusionRightAngleFixingBlockXpYpZcExtraReinforcementWithAttachHoleRemove(
              options,
            ),
          ]),
        ]),
        //corder
        aluminiumExtrusionRightAngleFixingBlockXpYpZpRemoveCorner(options),
      ]),
    ),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYvZcOptions extends
  //
  IAluminiumExtrusionRightAngleFixingBlockXpBlockOptions,
  IAluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove,
  IAluminiumExtrusionRightAngleFixingBlockZcExtrusionRemove//
{
}

export function aluminiumExtrusionRightAngleFixingBlockXpYvZc(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYvZcOptions,
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingBlockXpBlock(options),
    none(
      union([
        // extrusion remove
        aluminiumExtrusionRightAngleFixingBlockXpExtrusionRemove(options), // x
        aluminiumExtrusionRightAngleFixingBlockZcExtrusionRemove(options), // z
      ]),
    ),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYvZcPart1RemoveOptions {
  extrusionSide: number;
  extrusionCoverLength: number;
  extrusionCoverThickness: number;
}

export function aluminiumExtrusionRightAngleFixingBlockXpYvZcPart1Remove(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
  }: IAluminiumExtrusionRightAngleFixingBlockXpYvZcPart1RemoveOptions,
): Lines {
  const extra: number = 1;

  const l1_x: number = extra + extrusionCoverLength + extrusionCoverThickness +
    extrusionSide;
  const t1_x: number = -(extrusionSide * 0.5);

  const l1_y: number = extrusionCoverThickness + extrusionSide + extra;
  const t1_y: number = -(extrusionCoverThickness * 0.5) -
    (extrusionSide * 0.5) - extra + extrusionCoverThickness;

  const l1_z: number = extrusionCoverThickness + extrusionSide + extra;
  const t1_z: number =
    -(extrusionCoverThickness + (extrusionSide * 0.5) + extra);

  const l2_x: number = l1_x;
  const t2_x: number = t1_x;

  const l2_y: number = extrusionCoverThickness + extra;
  const t2_y: number = extrusionSide * 0.5;

  const l2_z: number = (extrusionCoverThickness * 2) + extrusionSide +
    (extra * 2);
  const t2_z: number =
    -(extrusionCoverThickness + (extrusionSide * 0.5) + extra);

  return union([
    translate([t1_x, t1_y, t1_z], [
      cube({ size: [l1_x, l1_y, l1_z], center: false }),
    ]),
    translate([t2_x, t2_y, t2_z], [
      cube({ size: [l2_x, l2_y, l2_z], center: false }),
    ]),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYvZcPart1Options
  extends
    //
    IAluminiumExtrusionRightAngleFixingBlockXpYvZcOptions,
    IAluminiumExtrusionRightAngleFixingBlockXpYvZcPart1RemoveOptions//
{
}

export function aluminiumExtrusionRightAngleFixingBlockXpYvZcPart1(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYvZcPart1Options,
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingBlockXpYvZc(options),
    debug(
      aluminiumExtrusionRightAngleFixingBlockXpYvZcPart1Remove(options),
    ),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlockXpYvZcPart2Options
  extends
    //
    IAluminiumExtrusionRightAngleFixingBlockXpYvZcOptions,
    IAluminiumExtrusionRightAngleFixingBlockXpYvZcPart1Options//
{
}

export function aluminiumExtrusionRightAngleFixingBlockXpYvZcPart2(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlockXpYvZcPart2Options,
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingBlockXpYvZc(options),
    debug(
      aluminiumExtrusionRightAngleFixingBlockXpYvZcPart1(options),
    ),
  ]);
}
