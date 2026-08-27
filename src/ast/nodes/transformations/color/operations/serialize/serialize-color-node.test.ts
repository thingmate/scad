import { describe, expect, test } from 'vitest';
import { serializeColorNode } from './serialize-color-node.ts';
import { color } from '../../color.ts';
import { cube } from '../../../../shapes/3d/cube/cube.ts';
import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';

describe('serializeColorNode', () => {
  test('[1, 2, 3]', () => {
    expect(serializeColorNode(color([0.1, 0.2, 0.3], [cube({ size: [1, 2, 3] })]))).toBe(
      dedent`
        color(c = [0.1, 0.2, 0.3]) {
          cube(size = [1, 2, 3]);
        }
      `,
    );
  });
});
