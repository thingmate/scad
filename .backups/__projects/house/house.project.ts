import { Lines } from '../../../src/misc/lines/lines.ts';
import { exportToScad } from '../../../src/ast/operations/export/export-to-scad.ts';
import { houseLand } from './land/land.ts';
import { union } from '../../../src/open-scad/build/modeling/union.ts';

function house(): Lines {
  return union([houseLand()]);
}

export async function houseProject() {
  await exportToScad('./dist/debug.scad', house());
}
