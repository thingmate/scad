import { describe, expect, test } from 'vitest';
import { serializeTranslateNode } from './serialize-translate-node.ts';
import { translate } from '../../translate.ts';
import { cube } from '../../../../shapes/3d/cube/cube.ts';
import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';

describe('serializeTranslateNode', () => {
  test('[1, 2, 3]', () => {
    expect(serializeTranslateNode(translate([1, 2, 3], [cube({ size: [1, 2, 3] })]))).toBe(
      dedent`
        translate(v = [1, 2, 3]) {
          cube(size = [1, 2, 3]);
        }
      `,
    );
  });
});
