import { describe, expect, test } from 'vitest';
import { serializeCubeNode } from './serialize-cube-node.ts';
import { cube } from '../../cube.ts';
import { dedent } from '../../../../../../../misc/string/dedent/dedent.ts';

describe('serializeCubeNode', () => {
  test('{ size: [1, 2, 3] }', () => {
    expect(serializeCubeNode(cube({ size: [1, 2, 3] }))).toBe('cube(size = [1, 2, 3]);');
  });

  test('{ size: [1, 2, 3], center: true }', () => {
    expect(serializeCubeNode(cube({ size: [1, 2, 3], center: true }))).toBe(
      dedent`
        cube(
          size = [1, 2, 3],
          center = true
        );
      `,
    );
  });
});
