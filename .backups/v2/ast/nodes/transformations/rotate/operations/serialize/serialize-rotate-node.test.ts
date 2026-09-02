import { describe, expect, test } from 'vitest';
import { serializeRotateNode } from './serialize-rotate-node.ts';
import { rotate } from '../../rotate.ts';
import { cube } from '../../../../shapes/3d/cube/cube.ts';
import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';

describe('serializeRotateNode', () => {
  test('{ angle: 5, vector: [1, 2, 3] }', () => {
    expect(
      serializeRotateNode(rotate({ angle: 5, vector: [1, 2, 3] }, [cube({ size: [1, 2, 3] })])),
    ).toBe(
      dedent`
        rotate(
          a = 5,
          v = [1, 2, 3]
        ) {
          cube(size = [1, 2, 3]);
        }
      `,
    );
  });
});
