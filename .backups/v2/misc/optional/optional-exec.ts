export function optionalExec<GValue, GReturn>(
  value: GValue | undefined,
  exec: (value: GValue) => GReturn,
): GReturn | undefined {
  return value === undefined ? undefined : exec(value);
}
