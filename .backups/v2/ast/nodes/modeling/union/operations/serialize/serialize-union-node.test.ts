import { describe, expect, test } from 'vitest';
import { serializeUnionNode } from './serialize-union-node.ts';
import { union } from '../../union.ts';
import { cube } from '../../../../shapes/3d/cube/cube.ts';
import { dedent } from '../../../../../../misc/string/dedent/dedent.ts';

describe('serializeUnionNode', () => {
  test('union', () => {
    expect(serializeUnionNode(union([cube({ size: [1, 2, 3] }), cube({ size: [4, 5, 6] })]))).toBe(
      dedent`
        union() {
          cube(size = [1, 2, 3]);
          cube(size = [4, 5, 6]);
        }
      `,
    );
  });
});
