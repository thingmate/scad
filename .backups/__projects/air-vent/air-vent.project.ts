import { Lines } from '../../../src/misc/lines/lines.ts';
import { group } from '../../../src/open-scad/build/others/group.ts';
import { $fn } from '../../../src/open-scad/build/others/fn.ts';
import { SCREW_M3 } from '../../../src/built-in/parts/screw/body/screw-body.constants.ts';
import { diameter } from '../../../src/math/units/length/circle/diameter.ts';
import { airVentDoorFix, IAirVentDoorFixOptions } from './parts/air-vent.parts.ts';
import { exportToScad } from '../../../src/ast/operations/export/export-to-scad.ts'; // function house(): Lines {

// function house(): Lines {
//   return union([
//     houseLand()
//   ])
// }

const AIR_VENT_CONFIG = {
  pipeInnerRadius: diameter(140),
  pipeOuterRadius: diameter(141),
  pipeInnerInsertHeight: 34,
  pipeInnerInsertThickness: 2,
  horizontalFixThickness: 2,
  horizontalFixWidth: 14,
  horizontalFixScrewRadius: SCREW_M3.radius,
  horizontalFixScrewOffset: 7,
  horizontalFixSpacing: 0.5,
  pipeFixPartThickness: 3,
  pipeFixPartHeight: 20,
  pipeFixPartAttachWidth: 11,
  pipeFixPartAttachThickness: 5,
  pipeFixPartAttachScrewRadius: SCREW_M3.radius,
};

function airVent(): Lines {
  const doorFixConfig: IAirVentDoorFixOptions = {
    length: 15,
    minY: 3,
    maxY: 5,
    radius: diameter(10),
    height: 8 + 5,
    holeRadius: diameter(3),
  };

  return group([
    $fn(30),
    // airVentPipeFixPart1(AIR_VENT_CONFIG),
    // translate([0, 0, 12], [
    //   airVentPipeFixPart2(AIR_VENT_CONFIG),
    // ]),
    // translate([0, 0, 14.5], [
    //   airVentPipeFixPart3(AIR_VENT_CONFIG),
    // ]),
    airVentDoorFix(doorFixConfig),
  ]);
}

export async function airVentProject() {
  await exportToScad('./dist/debug.scad', airVent());
}
