import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeTextFileSafe } from '../../../misc/file/write-text-file-safe.ts';
import { Part } from '../../../scene/part.ts';
import { Shape } from '../../../scene/shape.ts';
import { mm } from '../../../math/units/length/1d/mm.ts';
import { Material } from '../../../scene/material.ts';
import { hex } from '../../../types/rgba/create/hex.ts';
import { epsilon } from '../../../math/epsilon.ts';
import { diameter } from '../../../math/units/length/circle/diameter.ts';
import { deg } from '../../../math/units/angle/deg.ts';
import { repeat } from '../../../helpers/repeat.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../../..');
const DIST = join(ROOT, 'dist');

/*---*/

export interface AluminiumExtrusionRightAngleFixOptions {
  readonly extrusion_size: number;
  readonly screw_faces_length: number;
  readonly screw_faces_thickness: number;
  readonly screw_faces_hole_diameter: number;
  readonly screw_faces_hole_count: number;
  readonly screw_faces_hole_spacing: number;
  readonly reinforcement_faces_thickness: number;
}

export function aluminium_extrusion_right_angle_fix({
  extrusion_size,
  screw_faces_length,
  screw_faces_thickness,
  screw_faces_hole_diameter,
  screw_faces_hole_count,
  screw_faces_hole_spacing,
  reinforcement_faces_thickness,
}: AluminiumExtrusionRightAngleFixOptions): Part {
  const screw_face = Shape.difference(
    Shape.cube(screw_faces_length, screw_faces_thickness, extrusion_size),
    ...repeat(0, screw_faces_hole_count, 1, (i: number): Shape => {
      return Shape.cylinder(epsilon(screw_faces_thickness), diameter(screw_faces_hole_diameter))
        .rotateX(deg(90))
        .translate((i - (screw_faces_hole_count - 1) / 2) * screw_faces_hole_spacing, 0, 0)
        .debug();
    }),
  );

  const reinforcement_face = Shape.linearExtrude(
    Shape.polygon([
      [0, 0],
      [screw_faces_length, 0],
      [screw_faces_length, screw_faces_thickness],
      [screw_faces_thickness, screw_faces_length],
      [0, screw_faces_length],
    ]),
    reinforcement_faces_thickness,
  );

  return new Part({
    name: 'aluminium_extrusion_right_angle_fix',
    shape: Shape.union(
      screw_face.translate(screw_faces_length / 2, screw_faces_thickness / 2, 0),
      screw_face.rotateZ(deg(90)).translate(screw_faces_thickness / 2, screw_faces_length / 2, 0),
      reinforcement_face.translate(0, 0, -extrusion_size / 2 + reinforcement_faces_thickness / 2),
      reinforcement_face.translate(0, 0, +extrusion_size / 2 - reinforcement_faces_thickness / 2),
    ),
    material: new Material({
      color: hex('#494949'),
    }),
  });
}

/*---*/

export async function extrusionProject() {
  console.time('render');

  const scene = aluminium_extrusion_right_angle_fix({
    extrusion_size: mm(20),
    screw_faces_length: mm(32),
    screw_faces_thickness: mm(3),
    screw_faces_hole_diameter: mm(3.2),
    screw_faces_hole_count: 2,
    screw_faces_hole_spacing: mm(10),
    reinforcement_faces_thickness: mm(5),
  });

  await Promise.all([
    writeTextFileSafe(join(DIST, 'main.scad'), scene.toOpenscad()),
    writeTextFileSafe(join(DIST, 'bom.csv'), scene.toBOM().toCSV({ withTotal: true })),
  ]);

  console.timeEnd('render');
}
