export type Vector3d = readonly [x: number, y: number, z: number];

export function isVector3d(input: unknown): input is Vector3d {
  return (
    Array.isArray(input) &&
    input.length === 3 &&
    input.every((item: unknown): item is number => typeof item === 'number')
  );
}
