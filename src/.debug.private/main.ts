import { exportToScad } from '../ast/operations/export/export-to-scad.ts';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { wall } from '../built-in/parts/wall/wall.ts';
import { cm } from '../math/units/length/cm.ts';
import { meter } from '../math/units/length/meter.ts';
import { difference } from '../ast/nodes/modeling/difference/difference.ts';
import { wallOpening } from '../built-in/parts/opening/wall-opening.ts';
import { AtomicObject3d, CompositeItem, Cube, Material } from '../src/main.ts';
import { polyfill } from './polyfill.ts';
import { hex } from '../ast/nodes/base/color/rgba.ts';
import { mkdir, writeFile } from 'node:fs/promises';
import { serializeOpenScadNode } from '../ast/operations/serialize/serialize-open-scad-node.ts';
import { mainTrait } from '../abc-def.ts';

polyfill();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const DIST = join(ROOT, 'dist');

async function main_00() {
  const wallThickness = cm(20);

  const tree = difference([
    wall({
      length: meter(11),
      thickness: wallThickness,
      height: meter(2.7),
    }),
    wallOpening({
      length: meter(1.2),
      thickness: wallThickness,
      height: meter(1.4),
    }),
  ]);

  await exportToScad(join(DIST, 'main.scad'), tree);
}

async function main_01() {
  const WOOD = new Material({
    name: 'wood',
    color: hex('#5c3829'),
  });

  const poutre_01 = new AtomicObject3d({
    name: 'a',
    material: WOOD,
    shapes: [new Cube(1, 2, 30)],
  });

  const scene = new CompositeItem('window', [poutre_01]);

  console.log(scene.toOpenScad());

  const path: string = join(DIST, 'main.scad');

  await mkdir(dirname(path), {
    recursive: true,
  });

  await writeFile(path, scene.toOpenScad() + '\n', {
    encoding: 'utf-8',
  });
}

async function main() {
  // await main_00();
  // await main_01();
  mainTrait();
}

await main();
