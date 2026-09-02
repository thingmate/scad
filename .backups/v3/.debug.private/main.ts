import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { polyfill } from './polyfill.ts';
import { houseProject } from './projects/house/house.project.ts';
import { hex } from '../ast/nodes/base/color/rgba.ts';
import { mkdir, writeFile } from 'node:fs/promises';
import { serializeOpenScadNode } from '../ast/operations/serialize/serialize-open-scad-node.ts';
import { mainTrait } from '../abc-def.ts';

polyfill();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const DIST = join(ROOT, 'dist');

async function main_00() {
  // const WOOD = new Material({
  //   name: 'wood',
  //   color: hex('#5c3829'),
  // });
  //
  // const poutre_01 = new AtomicThing({
  //   name: 'a',
  //   material: WOOD,
  //   shape: new Cube(1, 2, 30),
  // });
  //
  // const scene = new AssembledThing('window', [poutre_01]).rotateX(deg(45));
  //
  // console.log(scene.toOpenscad());
  //
  // await exportToOpenscad(join(DIST, 'main.scad'), scene);
}

async function main() {
  // await main_00();
  // await houseProject();
  mainTrait();
}

await main();
