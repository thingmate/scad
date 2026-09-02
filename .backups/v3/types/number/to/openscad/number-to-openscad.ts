export function numberToOpenscad(input: number): string {
  if (Number.isNaN(input)) {
    return 'nan';
  } else if (input === Number.POSITIVE_INFINITY) {
    return 'inf';
  } else if (input === -Number.POSITIVE_INFINITY) {
    return '-inf';
  } else {
    return input.toString(10);
  }
}
