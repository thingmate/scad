import { describe, expect, test } from 'vitest';
import { serializeFunctionArguments } from './serialize-function-arguments.ts';

describe('serializeFunctionArguments', () => {
  test('{ a: 1 }', () => {
    expect(
      serializeFunctionArguments({
        a: '1',
      }),
    ).toBe('a = 1');
  });

  test('{ a: 1, b: 2 }', () => {
    expect(
      serializeFunctionArguments({
        a: '1',
        b: '1',
      }),
    ).toBe('\n  a = 1,\n  b = 1\n');
  });
});
