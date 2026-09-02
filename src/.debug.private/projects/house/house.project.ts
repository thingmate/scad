import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { epsilon } from '../../../math/epsilon.ts';
import { writeTextFileSafe } from '../../../misc/file/write-text-file-safe.ts';
import { Material } from '../../../scene/material.ts';
import { Part } from '../../../scene/part.ts';
import { Shape } from '../../../scene/shape.ts';
import { COLOR_CONCRETE } from '../../../types/rgba/built-in/concrete.ts';
import {
  HOUSE_WEST_CONCRETE_WALL_HEIGHT,
  HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_HEIGHT,
  HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_POSITION_X,
  HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_POSITION_Z,
  HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_WIDTH,
  HOUSE_WEST_CONCRETE_WALL_LENGTH,
  HOUSE_WEST_CONCRETE_WALL_THICKNESS,
} from './constants/constants.ts';
import { part_airtightness_aerosana_visconn } from './parts/airtightness/part_airtightness_aerosana_visconn.ts';
import { part_wood_fiber_insulation_steico_flex_240x1220x600 } from './parts/thermal_insulation/part_wood_fiber_insulation_steico_flex_240x1220x600.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../../..');
const DIST = join(ROOT, 'dist');

export function house_west_wall_concrete(): Part {
  return new Part({
    name: 'house_west_wall_concrete',
    shape: Shape.cube(
      HOUSE_WEST_CONCRETE_WALL_LENGTH,
      HOUSE_WEST_CONCRETE_WALL_THICKNESS,
      HOUSE_WEST_CONCRETE_WALL_HEIGHT,
      { center: false },
    ).difference(
      Shape.cube(
        HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_WIDTH,
        epsilon(HOUSE_WEST_CONCRETE_WALL_THICKNESS),
        HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_HEIGHT,
      )
        .translate(
          HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_POSITION_X,
          0,
          HOUSE_WEST_CONCRETE_WALL_KITCHEN_OPENING_POSITION_Z,
        )
        .debug(),
    ),
    material: new Material({
      color: COLOR_CONCRETE,
    }),
  });
}

export function house_west_wall_insulation(): Part {
  return new Part({
    name: 'house_west_wall_insulation',
    parts: [part_wood_fiber_insulation_steico_flex_240x1220x600()],
  });
}

export function house_west_wall(): Part {
  return new Part({
    name: 'house_west_wall',
    parts: [
      house_west_wall_concrete(),
      part_airtightness_aerosana_visconn(
        HOUSE_WEST_CONCRETE_WALL_LENGTH,
        HOUSE_WEST_CONCRETE_WALL_HEIGHT,
      ).translate(0, 0, -HOUSE_WEST_CONCRETE_WALL_THICKNESS / 2),
      house_west_wall_insulation(),
    ],
  });
}

export async function houseProject() {
  console.time('render');

  // const scene = thing_window(meter(1.2), meter(0.8), cm(8));
  const scene = house_west_wall();

  await Promise.all([
    writeTextFileSafe(join(DIST, 'main.scad'), scene.toOpenscad()),
    writeTextFileSafe(join(DIST, 'bom.csv'), scene.toBOM().toCSV({ withTotal: true })),
  ]);

  console.timeEnd('render');
}
