import { Lines } from '../../../../src/misc/lines/lines.ts';
import { repeat } from '../../../../src/open-scad/build/others/repeat.ts';
import { polygon } from '../../../../src/open-scad/build/primitives/2d/polygon.ts';
import { cube } from '../../../../src/open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../../../src/open-scad/build/primitives/3d/cylinder.ts';
import { linearExtrude } from '../../../../src/open-scad/build/transformations/linear-extrude.ts';
import { mirror } from '../../../../src/open-scad/build/transformations/mirror.ts';
import { rotate } from '../../../../src/open-scad/build/transformations/rotate.ts';
import { translate } from '../../../../src/open-scad/build/transformations/translate.ts';
import { difference } from '../../../../src/open-scad/build/modeling/difference.ts';
import { debug } from '../../../../src/open-scad/build/modifiers/debug.ts';
import { union } from '../../../../src/open-scad/build/modeling/union.ts';

/*---*/

/** INNER INSERT **/

export interface IAirVentPipeInnerInsertBlockOptions {
  pipeInnerRadius: number;
  pipeInnerInsertHeight: number;
  pipeInnerInsertThickness: number;
}

export function airVentPipeInnerInsertBlock(
  {
    pipeInnerRadius,
    pipeInnerInsertHeight,
    pipeInnerInsertThickness,
  }: IAirVentPipeInnerInsertBlockOptions,
): Lines {
  const extra: number = 1;

  return difference([
    cylinder({
      radius: pipeInnerRadius,
      height: pipeInnerInsertHeight,
      fragmentNumber: 128,
    }),
    debug(
      translate([0, 0, -extra], [
        cylinder({
          radius: (pipeInnerRadius - pipeInnerInsertThickness),
          height: (pipeInnerInsertHeight + (extra * 2)),
          fragmentNumber: 128,
        }),
      ]),
    ),
  ]);
}

/*---*/

/** HORIZONTAL FIX **/

export interface IAirVentPipeHorizontalFixBlockOptions {
  horizontalFixOuterRadius: number;
  horizontalFixInnerRadius: number;
  horizontalFixThickness: number;
  horizontalFixScrewRadius: number;
  horizontalFixScrewOffset?: number;
}

export function airVentPipeHorizontalFixFixBlock(
  {
    horizontalFixOuterRadius,
    horizontalFixInnerRadius,
    horizontalFixThickness,
    horizontalFixScrewRadius,
    horizontalFixScrewOffset = (horizontalFixOuterRadius - horizontalFixInnerRadius) * 0.5,
  }: IAirVentPipeHorizontalFixBlockOptions,
): Lines {
  const extra: number = 1;

  const screwHole = (): Lines => {
    const offset: number = horizontalFixOuterRadius - horizontalFixScrewOffset;

    return translate([offset, 0, -extra], [
      cylinder({
        radius: horizontalFixScrewRadius,
        height: (horizontalFixThickness + (extra * 2)),
      }),
    ]);
  };

  const screwHolesAround = (): Lines => {
    return repeat(4, (index: number): Lines => {
      return rotate([0, 0, 90 * index], [
        screwHole(),
      ]);
    });
  };

  return difference([
    cylinder({
      radius: horizontalFixOuterRadius,
      height: horizontalFixThickness,
      fragmentNumber: 128,
    }),
    debug(
      union([
        translate([0, 0, -extra], [
          cylinder({
            radius: horizontalFixInnerRadius,
            height: (horizontalFixThickness + (extra * 2)),
            fragmentNumber: 128,
          }),
        ]),
        screwHolesAround(),
      ]),
    ),
  ]);
}

/*---*/

/** PART 1 **/

export interface IAirVentPipeFixPart1Options extends //
  IAirVentPipeInnerInsertBlockOptions,
  Omit<IAirVentPipeHorizontalFixBlockOptions, 'horizontalFixOuterRadius' | 'horizontalFixInnerRadius'>
//
{
  pipeInnerRadius: number;
  pipeInnerInsertThickness: number;
  horizontalFixWidth: number;
}

export function airVentPipeFixPart1(
  {
    pipeInnerRadius,
    pipeInnerInsertThickness,
    horizontalFixWidth,
    ...options
  }: IAirVentPipeFixPart1Options,
): Lines {
  return union([
    airVentPipeInnerInsertBlock({
      ...options,
      pipeInnerRadius,
      pipeInnerInsertThickness,
    }),
    airVentPipeHorizontalFixFixBlock({
      ...options,
      horizontalFixOuterRadius: (pipeInnerRadius + horizontalFixWidth),
      horizontalFixInnerRadius: (pipeInnerRadius - pipeInnerInsertThickness),
    }),
  ]);
}

/*---*/

/** PART 2 **/

export interface IAirVentPipeFixPart2Options extends //
  Omit<IAirVentPipeHorizontalFixBlockOptions, 'horizontalFixOuterRadius' | 'horizontalFixInnerRadius'>
//
{
  pipeInnerRadius: number;
  horizontalFixWidth: number;
  horizontalFixSpacing: number;
}

export function airVentPipeFixPart2(
  {
    pipeInnerRadius,
    horizontalFixWidth,
    horizontalFixSpacing,
    ...options
  }: IAirVentPipeFixPart2Options,
): Lines {
  return union([
    airVentPipeHorizontalFixFixBlock({
      ...options,
      horizontalFixOuterRadius: (pipeInnerRadius + horizontalFixWidth),
      horizontalFixInnerRadius: (pipeInnerRadius + horizontalFixSpacing),
    }),
  ]);
}

/*---*/

/** PART 3 **/

export interface IAirVentPipeFixPart3CircleBlockOptions {
  pipeOuterRadius: number;
  pipeFixPartThickness: number;
  pipeFixPartHeight: number;
}

export function airVentPipeFixPart3CircleBlock(
  {
    pipeOuterRadius,
    pipeFixPartThickness,
    pipeFixPartHeight,
  }: IAirVentPipeFixPart3CircleBlockOptions,
): Lines {
  const extra: number = 1;
  const outerRadius: number = (pipeOuterRadius + pipeFixPartThickness);
  const removeHeight: number = (pipeFixPartHeight + (extra * 2));

  return difference([
    cylinder({
      radius: outerRadius,
      height: pipeFixPartHeight,
      fragmentNumber: 128,
    }),
    debug(
      union([
        translate([0, 0, -extra], [
          cylinder({
            radius: pipeOuterRadius,
            height: removeHeight,
            fragmentNumber: 128,
          }),
        ]),
        translate([-(outerRadius + extra), 0, -extra], [
          cube({
            size: [(outerRadius + extra) * 2, outerRadius + extra, removeHeight],
          }),
        ]),
      ]),
    ),
  ]);
}

/*---*/

export interface IAirVentPipeFixPart3AttachBlockOptions {
  pipeFixPartAttachWidth: number;
  pipeFixPartAttachThickness: number;
  pipeFixPartAttachScrewRadius: number;

  pipeOuterRadius: number;
  pipeFixPartThickness: number;
  pipeFixPartHeight: number;
}

export function airVentPipeFixPart3AttachBlock(
  {
    pipeFixPartAttachWidth,
    pipeFixPartAttachThickness,
    pipeFixPartAttachScrewRadius,
    pipeOuterRadius,
    pipeFixPartThickness,
    pipeFixPartHeight,
  }: IAirVentPipeFixPart3AttachBlockOptions,
): Lines {
  const extra: number = 1;

  return translate([pipeOuterRadius, -pipeFixPartAttachThickness, 0], [
    difference([
      cube({
        size: [pipeFixPartThickness + pipeFixPartAttachWidth, pipeFixPartAttachThickness, pipeFixPartHeight],
      }),
      debug(
        translate([pipeFixPartThickness + (pipeFixPartAttachWidth * 0.5), (pipeFixPartAttachThickness * 0.5), (pipeFixPartHeight * 0.5)], [
          rotate([90, 0, 0], [
            cylinder({
              radius: pipeFixPartAttachScrewRadius,
              height: pipeFixPartAttachThickness + (extra * 2),
              center: true,
            }),
          ]),
        ]),
      ),
    ]),
  ]);
}

/*---*/

export interface IAirVentPipeFixPart3Options extends //
  IAirVentPipeFixPart3CircleBlockOptions,
  IAirVentPipeFixPart3AttachBlockOptions
//
{
}

export function airVentPipeFixPart3(
  {
    ...options
  }: IAirVentPipeFixPart3Options,
): Lines {
  return union([
    airVentPipeFixPart3CircleBlock({
      ...options,
    }),
    airVentPipeFixPart3AttachBlock({
      ...options,
    }),
    mirror([1, 0, 0], [
      airVentPipeFixPart3AttachBlock({
        ...options,
      }),
    ]),
  ]);
}

/*-----------------*/

export interface IAirVentDoorFix2DOptions {
  length: number;
  minY: number;
  maxY: number;
  radius: number;
}

export function airVentDoorFix2D(
  {
    length,
    minY,
    maxY,
    radius,
  }: IAirVentDoorFix2DOptions,
): Lines {
  const b: number = radius + length;
  const c: number = -minY;
  const d: number = radius;
  const e: number = -maxY;

  return polygon({
    points: [
      0, 0,
      b, 0,
      b, c,
      d, e,
      0, e,
    ],
  });
}

export interface IAirVentDoorFix3DOptions extends IAirVentDoorFix2DOptions {
}

export function airVentDoorFix3D(
  {
    radius,
    ...options
  }: IAirVentDoorFix3DOptions,
): Lines {
  return linearExtrude({
    height: radius * 2,
    center: true,
  }, [
    airVentDoorFix2D({
      ...options,
      radius,
    }),
  ]);
}

export interface IAirVentDoorFixCylinderOptions {
  height: number;
  radius: number;
}

export function airVentDoorFixCylinder(
  {
    height,
    radius,
  }: IAirVentDoorFixCylinderOptions,
): Lines {
  return rotate([90, 0, 0], [
    cylinder({
      radius,
      height,
    }),
  ]);
}

export interface IAirVentDoorFixCylinderHoleOptions {
  height: number;
  holeRadius: number;
}

export function airVentDoorFixCylinderHole(
  {
    height,
    holeRadius,
  }: IAirVentDoorFixCylinderHoleOptions,
): Lines {
  return rotate([90, 0, 0], [
    translate([0, 0, -0.5], [
      cylinder({
        radius: holeRadius,
        height: height + 1,
      }),
    ]),
  ]);
}

export interface IAirVentDoorFixOptions extends //
  IAirVentDoorFix3DOptions,
  IAirVentDoorFixCylinderOptions,
  IAirVentDoorFixCylinderHoleOptions
  //
{
}

export function airVentDoorFix(
  {
    ...options
  }: IAirVentDoorFixOptions,
): Lines {
  return rotate([-90, 0, 0], [
    difference([
      union([
        airVentDoorFix3D(options),
        airVentDoorFixCylinder(options),
      ]),
      airVentDoorFixCylinderHole(options),
    ])
  ]);
}
