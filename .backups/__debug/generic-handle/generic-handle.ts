import { Lines } from '../../../src/misc/lines/lines.ts';
import { cube } from '../../../src/open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../../src/open-scad/build/primitives/3d/cylinder.ts';
import { rotate } from '../../../src/open-scad/build/transformations/rotate.ts';
import { translate } from '../../../src/open-scad/build/transformations/translate.ts';
import { minkowski } from '../../../src/open-scad/build/transformations/minkowski.ts';
import { linearExtrude } from '../../../src/open-scad/build/transformations/linear-extrude.ts';
import { polygon } from '../../../src/open-scad/build/primitives/2d/polygon.ts';
import { mirror } from '../../../src/open-scad/build/transformations/mirror.ts';
import { sphere } from '../../../src/open-scad/build/primitives/3d/sphere.ts';
import { union } from '../../../src/open-scad/build/modeling/union.ts';
import { difference } from '../../../src/open-scad/build/modeling/difference.ts';
import { debug } from '../../../src/open-scad/build/modifiers/debug.ts';
import { EPSILON } from '../../../src/math/epsilon.ts';

/*---*/

export interface IGenericHandleHandleBlockOptions {
  handleX: number;
  handleY: number;
  handleZ: number;
  handleBorderRadius: number;
}

export function genericHandleHandleBlock(
  {
    handleX,
    handleY,
    handleZ,
    handleBorderRadius,
  }: IGenericHandleHandleBlockOptions,
): Lines {
  return union([
    translate([
      handleX * -0.5,
      handleY * -0.5 + handleBorderRadius,
      -handleZ + handleBorderRadius,
    ], [
      minkowski([
        cube({
          size: [
            handleX - 10,
            handleY - (handleBorderRadius * 2),
            handleZ - (handleBorderRadius * 2),
          ],
        }),
        rotate([0, 90, 0], [
          cylinder({
            radius: handleBorderRadius,
            height: 10,
          }),
        ]),
      ]),
    ]),
  ]);
}

/*---*/

export interface IGenericHandleFixMainBlockOptions {
  handleFixX: number;
  handleFixY: number;
  handleFixZ: number;
  handleFixBorderRadius: number;
}

export function genericHandleFixMainBlock(
  {
    handleFixX,
    handleFixY,
    handleFixZ,
    handleFixBorderRadius,
  }: IGenericHandleFixMainBlockOptions,
): Lines {
  // debug(
  //   placedBorderRadius3d({
  //     radius: 1,
  //     points: [
  //       0, 0, 0,
  //       handleFixX, 0, 0,
  //       0, handleFixZ, 0,
  //       handleFixX, 0, handleFixY,
  //     ],
  //     face1: [0, 1, 2],
  //     face2: [2, 1, 3],
  //   }),
  // ),

  // debug(
  //   placedBorderRadius3d({
  //     radius: 1,
  //     points: [
  //       0, 0, handleFixY,
  //       0, handleFixZ, handleFixY,
  //       handleFixX, 0, handleFixY,
  //       0, handleFixZ, 0,
  //     ],
  //     face1: [0, 1, 2],
  //     face2: [2, 1, 3],
  //   }),
  // ),

  return rotate([90, 0, 0], [
    difference([
      translate([
        handleFixBorderRadius,
        0,
        handleFixY * -0.5 + handleFixBorderRadius,
      ], [
        minkowski([
          linearExtrude({
            height: handleFixY - (handleFixBorderRadius * 2),
          }, [
            polygon({
              points: [
                0,
                0,
                handleFixX - (handleFixBorderRadius * 2),
                0,
                0,
                handleFixZ - handleFixBorderRadius,
              ],
            }),
          ]),
          rotate([0, 90, 0], [
            sphere({
              radius: handleFixBorderRadius,
            }),
          ]),
        ]),
      ]),
      translate([0, -handleFixBorderRadius * 2, -handleFixY], [
        cube({
          size: [
            handleFixX + handleFixBorderRadius,
            handleFixBorderRadius * 2,
            handleFixY * 2,
          ],
        }),
      ]),
    ]),
  ]);
  // return rotate([90, 0, 0], [
  //   translate([0, 0, handleFixY * -0.5], [
  //     linearExtrude({
  //       height: handleFixY,
  //     }, [
  //       polygon({
  //         points: [
  //           0, 0,
  //           handleFixX, 0,
  //           0, handleFixZ,
  //         ],
  //       }),
  //     ]),
  //   ]),
  // ]);
}

/*---*/

export interface IGenericHandleFixBlockScrewRemoveOptions {
  handleFixScrewRadius: number;
  handleFixScrewHeight: number;
  handleFixScrewHeadRadius: number;
  handleFixX: number;
  handleFixZ: number;
}

export function genericHandleFixBlockScrewRemove(
  {
    handleFixScrewRadius,
    handleFixScrewHeight,
    handleFixScrewHeadRadius,
    handleFixX,
    handleFixZ,
  }: IGenericHandleFixBlockScrewRemoveOptions,
): Lines {
  const extra: number = 5;
  const screwHeadHeight: number = handleFixZ - handleFixScrewHeight + extra;
  const screwHeight: number = handleFixScrewHeight + extra;

  return debug(
    translate([handleFixX * 0.5, 0, handleFixScrewHeight], [
      union([
        translate([0, 0, 0], [
          cylinder({
            radius: handleFixScrewHeadRadius,
            height: screwHeadHeight,
          }),
        ]),
        translate([0, 0, -screwHeight + EPSILON], [
          cylinder({
            radius: handleFixScrewRadius,
            height: screwHeight,
          }),
        ]),
      ]),
    ]),
  );
}

/*---*/

export interface IGenericHandleFixBlockOptions extends
  //
  IGenericHandleFixMainBlockOptions,
  IGenericHandleFixBlockScrewRemoveOptions//
{
}

export function genericHandleFixBlock(
  options: IGenericHandleFixBlockOptions,
): Lines {
  return difference([
    genericHandleFixMainBlock(options),
    genericHandleFixBlockScrewRemove(options),
  ]);
}

/*---*/

export interface IGenericHandleOptions extends
  //
  IGenericHandleHandleBlockOptions,
  IGenericHandleFixBlockOptions//
{
  handleX: number;
  handleFixZ: number;
  handleFixBorderRadius: number;
}

export function genericHandle(
  {
    handleX,
    handleFixZ,
    handleFixBorderRadius,
    ...options
  }: IGenericHandleOptions,
): Lines {
  const t_x: number = handleX * 0.5;
  const t_z: number = -handleFixZ;

  return union([
    genericHandleHandleBlock({
      ...options,
      handleX: handleX + (handleFixBorderRadius * 2) + EPSILON,
    }),
    translate([t_x, 0, t_z], [
      genericHandleFixBlock({
        ...options,
        handleFixZ,
        handleFixBorderRadius,
      }),
    ]),
    translate([-t_x, 0, t_z], [
      mirror([1, 0, 0], [
        genericHandleFixBlock({
          ...options,
          handleFixZ,
          handleFixBorderRadius,
        }),
      ]),
    ]),
  ]);
}
