import { describe, expect, test } from 'vitest';
import { serializePolyhedronNode } from './serialize-polyhedron-node.ts';
import { polyhedron } from '../../polyhedron.ts';
import { dedent } from '../../../../../../../misc/string/dedent/dedent.ts';

describe.todo('serializePolyhedronNode', () => {
  test.todo('todo', () => {
    expect(serializePolyhedronNode(polyhedron({ points: [1, 2, 3], faces: [] }))).toBe(
      dedent`
        polyhedron(
          size = [1, 2, 3],
          center = true
        );
      `,
    );
  });
});
