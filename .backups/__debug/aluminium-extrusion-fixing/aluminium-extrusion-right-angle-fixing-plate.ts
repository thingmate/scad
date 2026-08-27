import { Lines } from '../../../src/misc/lines/lines.ts';
import { repeat } from '../../../src/open-scad/build/others/repeat.ts';
import { polygon } from '../../../src/open-scad/build/primitives/2d/polygon.ts';
import { cylinder } from '../../../src/open-scad/build/primitives/3d/cylinder.ts';
import { linearExtrude } from '../../../src/open-scad/build/transformations/linear-extrude.ts';
import { rotate } from '../../../src/open-scad/build/transformations/rotate.ts';
import { translate } from '../../../src/open-scad/build/transformations/translate.ts';
import { union } from '../../../src/open-scad/build/modeling/union.ts';
import { modifier } from '../../../src/open-scad/build/modifiers/modifier.ts';
import { difference } from '../../../src/open-scad/build/modeling/difference.ts';

/*-------------------------------------*/

export interface IAluminiumExtrusionRightAngleFixingPlateInitialBlockOptions {
  readonly extrusionSide: number;
  readonly extrusionCoverLength: number;
  readonly extrusionCoverThickness: number;
}

export function aluminiumExtrusionRightAngleFixingPlateInitialBlock(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
  }: IAluminiumExtrusionRightAngleFixingPlateInitialBlockOptions,
): Lines {
  return linearExtrude({
    height: extrusionCoverThickness,
    center: true,
  }, [
    polygon({
      points: [
        -extrusionSide,
        -extrusionSide,
        extrusionCoverLength,
        -extrusionSide,
        extrusionCoverLength,
        0,
        0,
        extrusionCoverLength,
        -extrusionSide,
        extrusionCoverLength,
      ],
    }),
  ]);
}

export interface IAluminiumExtrusionRightAngleFixingPlateScrewRemoveOptions {
  readonly screwBodyRadius: number;
  readonly screwBodyLength: number;
}

export function aluminiumExtrusionRightAngleFixingPlateScrewRemove(
  {
    screwBodyRadius,
    screwBodyLength,
  }: IAluminiumExtrusionRightAngleFixingPlateScrewRemoveOptions,
): Lines {
  return cylinder({
    radius: screwBodyRadius,
    height: screwBodyLength,
    center: true,
  });
}

export interface IAluminiumExtrusionRightAngleFixingPlateScrewsRemoveOptions
  extends
    //
    IAluminiumExtrusionRightAngleFixingPlateScrewRemoveOptions//
{
  readonly extrusionSide: number;
  readonly screwsSpacing: number;
  readonly screwsCount: number;
}

export function aluminiumExtrusionRightAngleFixingPlateScrewsRemove(
  {
    extrusionSide,
    screwsSpacing,
    screwsCount,
    ...options
  }: IAluminiumExtrusionRightAngleFixingPlateScrewsRemoveOptions,
): Lines {
  const screwOffsetX: number = -extrusionSide * 0.5;
  const screwOffsetY: number = -extrusionSide * 0.5;

  return modifier(
    "debug",
    union([
      repeat(screwsCount, (index: number) =>
        union([
          translate([screwOffsetX + index * screwsSpacing, screwOffsetY, 0], [
            aluminiumExtrusionRightAngleFixingPlateScrewRemove(options),
          ]),
          translate([screwOffsetY, screwOffsetX + index * screwsSpacing, 0], [
            rotate([0, 0, -90], [
              aluminiumExtrusionRightAngleFixingPlateScrewRemove(options),
            ]),
          ]),
        ])),
    ]),
  );
}

/*----*/

export interface IAluminiumExtrusionRightAngleFixingPlateOptions extends
  //
  IAluminiumExtrusionRightAngleFixingPlateInitialBlockOptions,
  IAluminiumExtrusionRightAngleFixingPlateScrewsRemoveOptions//
{
}

export function aluminiumExtrusionRightAngleFixingPlate(
  options: IAluminiumExtrusionRightAngleFixingPlateOptions,
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingPlateInitialBlock(options),
    aluminiumExtrusionRightAngleFixingPlateScrewsRemove(options),
  ]);
}
