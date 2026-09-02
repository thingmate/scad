import { describe, expect, test } from 'vitest';
import { serializeSphereNode } from './serialize-sphere-node.ts';
import { sphere } from '../../sphere.ts';

describe('serializeSphereNode', () => {
  test('{ radius: 1 }', () => {
    expect(serializeSphereNode(sphere({ radius: 1 }))).toBe('sphere(r = 1);');
  });
});
