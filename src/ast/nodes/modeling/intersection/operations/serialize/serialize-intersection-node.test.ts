import { describe, expect, test } from 'vitest';
import { serializeIntersectionNode } from './serialize-intersection-node.ts';
import { intersection } from '../../intersection.ts';
import { cube } from '../../../../shapes/3d/cube/cube.ts';
import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';

describe('serializeIntersectionNode', () => {
  test('intersection', () => {
    expect(
      serializeIntersectionNode(
        intersection([cube({ size: [1, 2, 3] }), cube({ size: [4, 5, 6] })]),
      ),
    ).toBe(
      dedent`
        intersection() {
          cube(size = [1, 2, 3]);
          cube(size = [4, 5, 6]);
        }
      `,
    );
  });
});
