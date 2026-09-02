import { describe, expect, test } from 'vitest';
import { serializeConeNode } from './serialize-cone-node.ts';
import { cone } from '../../cone.ts';
import { dedent } from '../../../../../../../misc/string/dedent/dedent.ts';

describe('serializeConeNode', () => {
  test('{ height: 1, radiusBottom: 2, radiusTop: 3 }', () => {
    expect(serializeConeNode(cone({ height: 1, radiusBottom: 2, radiusTop: 3 }))).toBe(
      dedent`
        cylinder(
          h = 1,
          r1 = 2,
          r2 = 3
        );
      `,
    );
  });
});
