export const EPSILON = 0.001;

export const EPSILON_FACTOR = 1.02;

export function epsilon(input: number): number {
  return input * EPSILON_FACTOR;
}
