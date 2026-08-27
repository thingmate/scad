import { Lines } from '../../../src/misc/lines/lines.ts';
import { cone } from '../../../src/open-scad/build/primitives/3d/cone.ts';
import { cube } from '../../../src/open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../../src/open-scad/build/primitives/3d/cylinder.ts';
import { mirror } from '../../../src/open-scad/build/transformations/mirror.ts';
import { rotate } from '../../../src/open-scad/build/transformations/rotate.ts';
import { translate } from '../../../src/open-scad/build/transformations/translate.ts';
import { screwBody } from '../../../src/built-in/parts/screw/body/screw-body.ts';
import { screwHexNutSideInsert } from '../../../src/built-in/parts/screw/nut/hex/screw-hex-nut-side-insert.ts';
import { union } from '../../../src/open-scad/build/modeling/union.ts';
import { difference } from '../../../src/open-scad/build/modeling/difference.ts';
import { debug } from '../../../src/open-scad/build/modifiers/debug.ts';
import { EPSILON } from '../../../src/math/epsilon.ts';

/*---*/

/** ROLLER **/

export interface ISpoolHolderRollerSegmentBaseBlockOptions {
  rollerOuterRadius: number;
  rollerInnerRadius: number;
  rollerLength: number;
}

export function spoolHolderRollerSegmentBaseBlock(
  {
    rollerOuterRadius,
    rollerInnerRadius,
    rollerLength,
  }: ISpoolHolderRollerSegmentBaseBlockOptions,
): Lines {
  return cone({
    radiusBottom: rollerOuterRadius,
    radiusTop: rollerInnerRadius,
    height: (rollerLength * 0.5),
    fragmentNumber: 128,
  });
}

/*---*/

export interface ISpoolHolderRollerSegmentScrewRemoveOptions {
  rollerOuterRadius: number;
  rollerScrewLength: number;
  rollerScrewExtraLength: number;
  rollerScrewRadius: number;
  rollerScrewNutRadius: number;
  rollerScrewNutHeight: number;
}

export function spoolHolderRollerSegmentScrewRemove(
  {
    rollerOuterRadius,
    rollerScrewLength,
    rollerScrewExtraLength,
    rollerScrewRadius,
    rollerScrewNutRadius,
    rollerScrewNutHeight,
  }: ISpoolHolderRollerSegmentScrewRemoveOptions,
): Lines {
  return union([
    screwBody({
      radius: rollerScrewRadius,
      height: ((rollerScrewLength + rollerScrewExtraLength) * 2),
    }),
    translate([0, 0, rollerScrewLength - (rollerScrewNutHeight * 0.5)], [
      screwHexNutSideInsert({
        radius: rollerScrewNutRadius,
        height: rollerScrewNutHeight,
        insertLength: rollerOuterRadius + 1,
      }),
    ]),
  ]);
}

/*---*/

export interface ISpoolHolderRollerSegmentOptions extends
  //
  ISpoolHolderRollerSegmentBaseBlockOptions,
  ISpoolHolderRollerSegmentScrewRemoveOptions//
{
}

export function spoolHolderRollerSegment(
  {
    rollerLength,
    ...options
  }: ISpoolHolderRollerOptions,
): Lines {
  return rotate([0, -90, 0], [
    translate([0, 0, -(rollerLength * 0.5)], [
      difference([
        spoolHolderRollerSegmentBaseBlock({
          ...options,
          rollerLength,
        }),
        debug(
          spoolHolderRollerSegmentScrewRemove(options),
        ),
      ]),
    ]),
  ]);
}

/*---*/

export interface ISpoolHolderRollerOptions extends
  //
  ISpoolHolderRollerSegmentOptions//
{
}

export function spoolHolderRoller(
  {
    ...options
  }: ISpoolHolderRollerOptions,
): Lines {
  return union([
    spoolHolderRollerSegment(options),
    rotate([0, 180, 0], [
      spoolHolderRollerSegment(options),
    ]),
  ]);
}

/*---*/

export interface ISpoolHolderRollerPositionedOptions extends
  //
  ISpoolHolderRollerSegmentOptions//
{
  rollerDistanceY: number;
  rollerOuterRadius: number;
  rollerBaseBlockSpaceZ: number;
}

export function spoolHolderRollerPositioned(
  {
    rollerDistanceY,
    rollerOuterRadius,
    rollerBaseBlockSpaceZ,
    ...options
  }: ISpoolHolderRollerPositionedOptions,
): Lines {
  const t_y: number = -(rollerDistanceY * 0.5);
  const t_z: number = rollerOuterRadius + rollerBaseBlockSpaceZ;

  return translate([0, t_y, t_z], [
    spoolHolderRoller({
      ...options,
      rollerOuterRadius,
    }),
  ]);
}

/** HOLDER **/

export interface ISpoolHolderBaseBlockBearingRemove {
  bearingRadius: number;
  bearingHeight: number;
}

export function spoolHolderBaseBlockBearingRemove(
  {
    bearingRadius,
    bearingHeight,
  }: ISpoolHolderBaseBlockBearingRemove,
): Lines {
  return cylinder({
    radius: bearingRadius,
    height: (bearingHeight + EPSILON),
    fragmentNumber: 64,
  });
}

/*---*/

export interface ISpoolHolderBaseBlockBearingScrewRemove {
  bearingScrewLength: number;
  bearingScrewRadius: number;
  bearingScrewHeadRadius: number;
  baseBlockExtraThicknessX: number;
}

export function spoolHolderBaseBlockBearingScrewRemove(
  {
    bearingScrewLength,
    bearingScrewRadius,
    bearingScrewHeadRadius,
    baseBlockExtraThicknessX,
  }: ISpoolHolderBaseBlockBearingScrewRemove,
): Lines {
  return union([
    translate([0, 0, -EPSILON], [
      cylinder({
        radius: bearingScrewRadius,
        height: bearingScrewLength,
      }),
    ]),
    translate([0, 0, -(baseBlockExtraThicknessX * 2) + EPSILON], [
      cylinder({
        radius: bearingScrewHeadRadius,
        height: (baseBlockExtraThicknessX * 2),
      }),
    ]),
  ]);
}

/*---*/

export interface ISpoolHolderBaseBlockBearingAndScrewRemove extends
  //
  ISpoolHolderBaseBlockBearingRemove,
  ISpoolHolderBaseBlockBearingScrewRemove//
{
  bearingHeight: number;
}

export function spoolHolderBaseBlockBearingAndScrewRemove(
  {
    bearingHeight,
    ...options
  }: ISpoolHolderBaseBlockBearingAndScrewRemove,
): Lines {
  return translate([-bearingHeight, 0, 0], [
    rotate([0, 90, 0], [
      union([
        spoolHolderBaseBlockBearingRemove({
          ...options,
          bearingHeight,
        }),
        spoolHolderBaseBlockBearingScrewRemove(options),
      ]),
    ]),
  ]);
}

/*---*/

export interface ISpoolHolderBaseBlockXPart {
  rollerOuterRadius: number;
  rollerLength: number;
  rollerBaseBlockSpaceX: number;
  rollerBaseBlockSpaceY: number;
  rollerBaseBlockSpaceZ: number;
  baseBlockThicknessY: number;
}

export function spoolHolderBaseBlockXPart(
  {
    rollerOuterRadius,
    rollerLength,
    rollerBaseBlockSpaceX,
    rollerBaseBlockSpaceY,
    rollerBaseBlockSpaceZ,
    baseBlockThicknessY,
  }: ISpoolHolderBaseBlockXPart,
): Lines {
  // const ratio_z: number = 0.6;
  // const offset_z: number = 3.4;
  const ratio_z: number = 0.75;
  const offset_z: number = 0;

  const s_x: number = rollerBaseBlockSpaceX + (rollerLength * 0.5) +
    EPSILON;
  const s_y: number = baseBlockThicknessY;
  const s_z: number = ((rollerOuterRadius * 2) + (rollerBaseBlockSpaceZ * 2)) *
    ratio_z;

  const t_x: number = 0;
  const t_y: number =
    -(rollerOuterRadius + rollerBaseBlockSpaceY + baseBlockThicknessY);
  const t_z: number = -(rollerOuterRadius + rollerBaseBlockSpaceZ) + offset_z;

  return translate([t_x, t_y, t_z], [
    cube({ size: [s_x, s_y, s_z] }),
  ]);
}

/*---*/

export interface ISpoolHolderBaseBlockYPart {
  rollerDistanceY: number;
  rollerOuterRadius: number;
  rollerBaseBlockSpaceY: number;
  rollerBaseBlockSpaceZ: number;
  bearingHeight: number;
  baseBlockExtraThicknessX: number;
  baseBlockThicknessY: number;
}

export function spoolHolderBaseBlockYPart(
  {
    rollerDistanceY,
    rollerOuterRadius,
    rollerBaseBlockSpaceY,
    rollerBaseBlockSpaceZ,
    bearingHeight,
    baseBlockExtraThicknessX,
    baseBlockThicknessY,
  }: ISpoolHolderBaseBlockYPart,
): Lines {
  const s_x: number = bearingHeight + baseBlockExtraThicknessX;
  const s_y: number = (rollerDistanceY * 0.5) + rollerOuterRadius +
    rollerBaseBlockSpaceY + baseBlockThicknessY + EPSILON;
  const s_z: number = (rollerOuterRadius * 2) + (rollerBaseBlockSpaceZ * 2);

  const t_x: number = -s_x;
  const t_y: number =
    -(rollerOuterRadius + rollerBaseBlockSpaceY + baseBlockThicknessY);
  const t_z: number = -(rollerOuterRadius + rollerBaseBlockSpaceZ);

  return translate([t_x, t_y, t_z], [
    cube({ size: [s_x, s_y, s_z] }),
  ]);
}

/*---*/

export interface ISpoolHolderBaseBlock extends
  //
  ISpoolHolderBaseBlockBearingAndScrewRemove,
  ISpoolHolderBaseBlockXPart,
  ISpoolHolderBaseBlockYPart//
{
}

export function spoolHolderBaseBlock(
  {
    ...options
  }: ISpoolHolderBaseBlock,
): Lines {
  return difference([
    union([
      spoolHolderBaseBlockXPart(options),
      spoolHolderBaseBlockYPart(options),
    ]),
    debug(
      spoolHolderBaseBlockBearingAndScrewRemove(options),
    ),
  ]);
}

/*---*/

export interface ISpoolHolderHalfOptions extends
  //
  ISpoolHolderBaseBlock//
{
  rollerLength: number;
  rollerBaseBlockSpaceX: number;
  rollerBaseBlockSpaceZ: number;
  rollerOuterRadius: number;
  rollerDistanceY: number;
}

export function spoolHolderHalf(
  {
    rollerLength,
    rollerBaseBlockSpaceX,
    rollerBaseBlockSpaceZ,
    rollerOuterRadius,
    rollerDistanceY,
    ...options
  }: ISpoolHolderHalfOptions,
): Lines {
  const t_x: number = rollerBaseBlockSpaceX + (rollerLength * 0.5);
  const t_y: number = rollerDistanceY * 0.5;
  const t_z: number = rollerBaseBlockSpaceZ + rollerOuterRadius;

  const generateBaseBlock = () => {
    return translate([-t_x, -t_y, t_z], [
      spoolHolderBaseBlock({
        ...options,
        rollerLength,
        rollerBaseBlockSpaceX,
        rollerBaseBlockSpaceZ,
        rollerOuterRadius,
        rollerDistanceY,
      }),
    ]);
  };

  return union([
    generateBaseBlock(),
    mirror([1, 0, 0], [
      generateBaseBlock(),
    ]),
  ]);
}

/*---*/

export interface ISpoolHolderOptions extends
  //
  ISpoolHolderHalfOptions//
{
}

export function spoolHolder(
  {
    ...options
  }: ISpoolHolderOptions,
): Lines {
  return union([
    spoolHolderHalf(options),
    mirror([0, 1, 0], [
      spoolHolderHalf(options),
    ]),
  ]);
}
