export function repeat<GReturn>(
  start: number,
  end: number,
  step: number,
  callback: (index: number) => GReturn,
): GReturn[] {
  const result: GReturn[] = [];
  for (let i: number = start; i < end; i += step) {
    result.push(callback(i));
  }
  return result;
}
