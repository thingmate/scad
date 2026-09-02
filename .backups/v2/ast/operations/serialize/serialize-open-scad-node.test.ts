import { describe, expect, test } from 'vitest';
import { serializeOpenScadNode } from './serialize-open-scad-node.ts';
import { cube } from '../../elements/shapes/3d/cube/cube.ts';
import { translate } from '../../elements/transformations/translate/translate.ts';
import { dedent } from '../../../misc/string/dedent/dedent.ts';

describe('serializeOpenScadNode', () => {
  test('01', () => {
    const tree = translate([1, 2, 3], [cube({ size: [1, 2, 3] })]);

    expect(serializeOpenScadNode(tree)).toBe(
      dedent`
        translate(v = [1, 2, 3]) {
          cube(size = [1, 2, 3]);
        }
      `,
    );
  });
});
