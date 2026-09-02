import { describe, expect, test } from 'vitest';
import { serializeDifferenceNode } from './serialize-difference-node.ts';
import { difference } from '../../difference.ts';
import { cube } from '../../../../shapes/3d/cube/cube.ts';
import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';

describe('serializeDifferenceNode', () => {
  test('difference', () => {
    expect(
      serializeDifferenceNode(difference([cube({ size: [1, 2, 3] }), cube({ size: [4, 5, 6] })])),
    ).toBe(
      dedent`
        difference() {
          cube(size = [1, 2, 3]);
          cube(size = [4, 5, 6]);
        }
      `,
    );
  });
});
