import { describe, expect, test } from 'vitest';
import { cylinder } from './cylinder.ts';
import { serializeConeNode } from '../cone/operations/serialize/serialize-cone-node.ts';
import { dedent } from '../../../../../misc/string/dedent/dedent.ts';

describe('cylinder', () => {
  test('{ height: 1, radius: 2 }', () => {
    expect(serializeConeNode(cylinder({ height: 1, radius: 2 }))).toBe(
      dedent`
        cylinder(
          h = 1,
          r1 = 2,
          r2 = 2
        );
      `,
    );
  });
});
