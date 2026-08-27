import { Lines } from '../../src/misc/lines/lines.ts';
import { exportToScad } from '../../src/ast/operations/export/export-to-scad.ts';
import { $fn } from '../../src/open-scad/build/others/fn.ts';
import { group } from '../../src/open-scad/build/others/group.ts';
import { cylinder } from '../../src/open-scad/build/primitives/3d/cylinder.ts';
import { rotate } from '../../src/open-scad/build/transformations/rotate.ts';
import { translate } from '../../src/open-scad/build/transformations/translate.ts';
import { SCREW_M3 } from '../../src/built-in/parts/screw/body/screw-body.constants.ts';
import { HEX_NUT_M3_SELF_LOCK } from '../../src/built-in/parts/screw/nut/hex/screw-hex-nut.constants.ts';
import {
  aluminiumExtrusionRightAngleFixingPlate,
  IAluminiumExtrusionRightAngleFixingPlateOptions,
} from './aluminium-extrusion-fixing/aluminium-extrusion-right-angle-fixing-plate.ts';
import { rollingShutterHandle } from './rolling-shutter-handle/rolling-shutter-handle.ts';
import {
  ISimpleLockFixBlockOptions,
  ISimpleLockLockOptions,
  simpleLockLock,
} from './simple-lock/simple-lock.ts';
import {
  aluminiumExtrusionRightAngleFixing,
  IAluminiumExtrusionRightAngleFixingOptions,
} from './aluminium-extrusion-fixing/aluminium-extrusion-right-angle-fixing.ts';
import {
  aluminiumExtrusionRightAngleFixingBlockXpYpZc,
  aluminiumExtrusionRightAngleFixingBlockXpYpZcPart1,
  aluminiumExtrusionRightAngleFixingBlockXpYpZcPart2,
  aluminiumExtrusionRightAngleFixingBlockXpYpZp,
  aluminiumExtrusionRightAngleFixingBlockXpYvZc,
} from './aluminium-extrusion-fixing/aluminium-extrusion-fixing.ts';
import {
  aluminiumExtrusionGridAttach,
  IAluminiumExtrusionGridAttachOptions,
} from './aluminium-extrusion-grid-attach/aluminium-extrusion-grid-attach.ts';
import { diameter } from '../../src/math/units/length/circle/diameter.ts';
import { background } from '../../src/open-scad/build/modifiers/background.ts';
import { sofaTableFoot } from './sofa-table/sofa-table.ts';
import { placedBorderRadius3d } from '../../src/open-scad/build/primitives/3d/placed-border-radius-3d.ts';
import { genericHandle, IGenericHandleOptions } from './generic-handle/generic-handle.ts';
import { spoolHolder } from './spool-holder/spool-holder.ts';

const OUT_PATH = './dist/debug.scad';

/*--------------*/

function project01(): Lines {
  const config = {
    extrusionSide: 20.4,
    extrusionCoverLength: 30,
    extrusionCoverThickness: 2,
    extrusionAttachHoleRadius: diameter(3),
    extrusionAttachHoleOffset: 10,
    reinforcementLength: 30,
    extraReinforcementLength: 10,
    extraReinforcementAttachHoleOffset: 10,
    extraReinforcementAttachHoleRadius: diameter(3),
    removeAngleCornerSize: 10,
  };

  return group([
    $fn(30),
    // aluminiumExtrusionRightAngleFixingBlockXpYpZc(config),
    // aluminiumExtrusionRightAngleFixingBlockXpYpZcPart1(config),
    aluminiumExtrusionRightAngleFixingBlockXpYpZcPart2(config),
    // aluminiumExtrusionRightAngleFixingBlockXpYpZp(config),
    // aluminiumExtrusionRightAngleFixingBlockXpYvZc(config),
    // aluminiumExtrusionRightAngleFixingBlockXpYvZcPart1(config),
    // aluminiumExtrusionRightAngleFixingBlockXpYvZcPart2(config),
  ]);
}

function project011(): Lines {
  const config: IAluminiumExtrusionRightAngleFixingOptions = {
    extrusionSide: 20,
    extrusionCoverLength: 30,
    screwBodyRadius: diameter(3),
    screwBodyLength: 50,
    screwHeadRadius: diameter(7.6),
    screwHeadLength: 50,
    screwOffsetX: 10,
    screwOffsetY: 4,
    screwsSpacing: 10,
    screwsCount: 2,
  };

  return group([$fn(30), aluminiumExtrusionRightAngleFixing(config)]);
}

function project012(): Lines {
  const config: IAluminiumExtrusionRightAngleFixingPlateOptions = {
    extrusionSide: 20,
    extrusionCoverLength: 30,
    extrusionCoverThickness: 3,
    screwBodyRadius: diameter(3),
    screwBodyLength: 50,
    screwsSpacing: 16,
    screwsCount: 3,
  };

  return group([$fn(30), aluminiumExtrusionRightAngleFixingPlate(config)]);
}

function project02(): Lines {
  return group([$fn(30), sofaTableFoot({ footSize: [16, 10, 240] })]);
}

function project03(): Lines {
  const config = {
    rollerOuterRadius: diameter(16),
    rollerInnerRadius: diameter(14),
    rollerLength: 136,
    rollerScrewLength: 25,
    rollerScrewExtraLength: 5,
    rollerScrewRadius: SCREW_M3.radius,
    rollerScrewNutRadius: HEX_NUT_M3_SELF_LOCK.radius + 0.15,
    rollerScrewNutHeight: HEX_NUT_M3_SELF_LOCK.height + 1,
    rollerBaseBlockSpaceX: 0.5,
    rollerBaseBlockSpaceY: 2,
    rollerBaseBlockSpaceZ: 3,
    rollerDistanceY: 110,

    //
    bearingRadius: diameter(9) + 0.15,
    bearingHeight: 4.0 + 0.1,
    bearingScrewLength: 25,
    bearingScrewRadius: SCREW_M3.radius,
    bearingScrewHeadRadius: diameter(7),
    baseBlockExtraThicknessX: 2,
    baseBlockThicknessY: 4,
  };

  const computeMinSpoolRadius = ({
    rollerDistanceY,
    rollerInnerRadius,
    rollerBaseBlockSpaceZ,
  }: any): number => {
    const x: number = rollerDistanceY * 0.5;
    const y: number = rollerBaseBlockSpaceZ + rollerInnerRadius * 2;
    return (x ** 2 + y ** 2) / (2 * y);
  };

  const minSpoolRadius: number = computeMinSpoolRadius(config);
  console.log('minSpoolDiameter', minSpoolRadius * 2);

  interface ISpool {
    diameter: number;
    width: number;
  }

  const spook_1kg: ISpool = {
    diameter: 200,
    width: 66,
  };

  const spook_2kg: ISpool = {
    diameter: 200,
    width: 130,
  };

  const spook_3kg: ISpool = {
    diameter: 250,
    width: 115,
  };

  const spool_limits: ISpool = {
    diameter: minSpoolRadius * 2,
    width: config.rollerLength - 2,
  };

  const spool: ISpool = spook_1kg;
  // const spool: ISpool = spook_2kg;
  // const spool: ISpool = spook_3kg;
  // const spool: ISpool = spool_limits;

  return group([
    $fn(30),
    spoolHolder(config),
    // spoolHolderRollerPositioned(config),
    // none(
    //   mirror([0, 1, 0], [
    //     spoolHolderRollerPositioned(config),
    //   ]),
    // ),
    background(
      translate(
        [-(spool.width * 0.5), 0, diameter(spool.diameter) + 3],
        [
          rotate(
            [0, 90, 0],
            [
              cylinder({
                radius: diameter(spool.diameter),
                height: spool.width,
                fragmentNumber: 256,
              }),
            ],
          ),
        ],
      ),
    ),
  ]);
}

function project05(): Lines {
  const config = {
    bottomWheelRadius: diameter(17),
    bottomWheelHeight: 3,
  };

  return group([$fn(30), rollingShutterHandle(config)]);
}

function project06(): Lines {
  const handleZ = 14;
  const handleFixZ = 30;
  const borderRadius = 4;

  const config: IGenericHandleOptions = {
    handleX: 90,
    handleY: 20,
    handleZ: handleZ,
    handleBorderRadius: borderRadius,
    // handleFixX: 50,
    handleFixX: handleFixZ + handleZ,
    handleFixY: 20,
    handleFixZ: handleFixZ + handleZ,
    handleFixScrewRadius: SCREW_M3.radius,
    handleFixScrewHeight: 10,
    handleFixScrewHeadRadius: diameter(8),
    handleFixBorderRadius: borderRadius,
  };

  return group([$fn(16), genericHandle(config)]);
}

function debugBorderRadius3d(): Lines {
  return group([
    $fn(30),
    placedBorderRadius3d({
      radius: 1,

      points: [0, 0, 0, 10, 0, 10, 10, 0, 0, 10, 10, 0],
      face1: [0, 1, 2],
      face2: [2, 1, 3],
      // points: [
      //   0, 0, 0,
      //   10, 0, 0,
      //   10, 10, 0,
      //   10, 0, 10,
      // ],
      // face1: [0, 1, 2],
      // face2: [1, 3, 2],

      // points: [
      //   0, 0, 10,
      //   10, 10, 10,
      //   10, 0, 10,
      //   10, 0, 0,
      // ],
      // face1: [0, 1, 2],
      // face2: [3, 2, 1],
    }),
  ]);
}

function project07(): Lines {
  const config: ISimpleLockFixBlockOptions & ISimpleLockLockOptions = {
    fixBlockX: 38,
    fixBlockY: 20,
    fixBlockZ: 3,
    fixBlockFixScrewRadius: SCREW_M3.radius,
    fixBlockFixScrewBorderOffset: 5,
    lockScrewRadius: SCREW_M3.radius,
    fixBlockLockTotalHeight: 6,
    lockWidth: 15,
    lockLength: 25,
    lockHeight: 5,
  };

  return group([
    $fn(16),
    // simpleLockFixBlock(config),
    simpleLockLock(config),
  ]);
}

function project08(): Lines {
  const config: IAluminiumExtrusionGridAttachOptions = {
    holesSpacing: 19,
    holesRadius: diameter(3),
    xLength: 19 * 2 - 1,
    yLength: 18,
    zLength: 4,
  };

  return group([$fn(16), aluminiumExtrusionGridAttach(config)]);
}

/*--------------*/

export async function debugFunctionBased() {
  const lines = project01();
  // const lines = project011();
  // const lines = project012();

  // const lines = project02();
  // const lines = project03();
  // const lines = project04();
  // const lines = project05();
  // const lines = project06();
  // const lines = debugBorderRadius3d();
  // const lines = project07();

  // const lines = project08();

  await exportToScad(OUT_PATH, lines);
}
