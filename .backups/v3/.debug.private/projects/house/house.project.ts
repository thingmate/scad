import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { epsilon, EPSILON } from '../../../math/epsilon.ts';
import { cm } from '../../../math/units/length/1d/cm.ts';
import { meter } from '../../../math/units/length/1d/meter.ts';
import { mm } from '../../../math/units/length/1d/mm.ts';
import { difference } from '../../../shapes/3d/assemble/difference/difference.ts';
import { cube } from '../../../shapes/3d/base/cube/cube.ts';
import { assembledThing, AssembledThing } from '../../../things/assembled/assembled-thing.ts';
import { atomicThing, AtomicThing } from '../../../things/atomic/atomic-thing.ts';
import { exportToBOM } from '../../../things/export/export-to-bom.ts';
import { exportToOpenscad } from '../../../things/export/export-to-openscad.ts';
import { COLOR_CONCRETE } from '../../../types/rgba/built-in/concrete.ts';
import { COLOR_GLASS } from '../../../types/rgba/built-in/glass.ts';
import { COLOR_WHITE_PVC } from '../../../types/rgba/built-in/whit-pvc.ts';
import { COLOR_WOOD } from '../../../types/rgba/built-in/wood.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../../..');
const DIST = join(ROOT, 'dist');

export function thing_wooden_beam_80x60(length: number): AtomicThing {
  return atomicThing({
    name: `wooden_beam_80x60x${length}`,
    shape: cube(length, mm(80), mm(60)),
    color: COLOR_WOOD,
    shopUrl: 'https://www.etsy.com/listing/1240222222/wooden-beam-80x60-with-wood-frame',
    price: length * 10,
  });
}

export function thing_window(width: number, height: number, thickness: number): AssembledThing {
  const pvcThickness: number = cm(10);

  const glassWidth: number = width - pvcThickness * 2;
  const glassHeight: number = height - pvcThickness * 2;
  const glassThickness: number = thickness - cm(2);

  return assembledThing({
    name: `window_${width}x${height}x${thickness}`,
    children: [
      atomicThing({
        name: 'glass',
        color: COLOR_GLASS,
        shape: cube(glassWidth, glassThickness, glassHeight),
      }),
      atomicThing({
        name: 'pvc',
        color: COLOR_WHITE_PVC,
        shape: difference([
          cube(width, thickness, height),
          cube(glassWidth, thickness + EPSILON, glassHeight),
        ]),
      }),
    ],
    shopUrl: 'https://www.etsy.com/listing/1240222222/wooden-beam-80x60-with-wood-frame',
  });
}

export const HOUSE_NORTH_SOUTH_CONCRETE_WALL_LENGTH = meter(12.7);
export const HOUSE_WALL_HEIGHT = meter(9.1);
export const HOUSE_WEST_EST_CONCRETE_WALL_LENGTH = meter(11);
export const HOUSE_CONCRETE_WALL_THICKNESS = cm(22);

export const HOUSE_WEST_CONCRETE_WALL_LENGTH = HOUSE_NORTH_SOUTH_CONCRETE_WALL_LENGTH;
export const HOUSE_WEST_CONCRETE_WALL_HEIGHT = HOUSE_WALL_HEIGHT;
export const HOUSE_WEST_CONCRETE_WALL_THICKNESS = HOUSE_CONCRETE_WALL_THICKNESS;
export const HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_WIDTH = meter(1.2);
export const HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_HEIGHT = meter(1.0);

export function house_west_concrete_wall(): AtomicThing {
  return atomicThing({
    name: 'house_west_concrete_wall',
    color: COLOR_CONCRETE,
    shape: difference([
      cube(
        HOUSE_WEST_CONCRETE_WALL_THICKNESS,
        HOUSE_WEST_CONCRETE_WALL_LENGTH,
        HOUSE_WEST_CONCRETE_WALL_HEIGHT,
        false,
      ),
      cube(
        epsilon(HOUSE_WEST_CONCRETE_WALL_THICKNESS),
        HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_WIDTH,
        HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_HEIGHT,
        false,
      ).translate(0, 0, 0),
    ]),
  });
}

export async function houseProject() {
  // const scene = thing_window(meter(1.2), meter(0.8), cm(8));
  const scene = house_west_concrete_wall();

  await exportToOpenscad(join(DIST, 'main.scad'), scene);
  await exportToBOM(join(DIST, 'bom.csv'), scene);

  console.log('done');
}
