export const MATCH_PATTERN = Symbol('MATCH_PATTERN');

export type MatchPatternFunction<GFunction extends (...args: any) => any> = GFunction extends (
  ...args: infer GArgs
) => any
  ? (...args: GArgs) => boolean
  : never;

export type PatternMatcher<GFunction extends (...args: any) => any> = GFunction & {
  readonly [MATCH_PATTERN]: MatchPatternFunction<GFunction>;
};

export function patternMatcher<GFunction extends (...args: any) => any>(
  match: MatchPatternFunction<GFunction>,
  fnc: GFunction,
): PatternMatcher<GFunction> {
  return Object.freeze(
    Object.assign(fnc, {
      [MATCH_PATTERN]: match,
    }),
  );
}

/*--*/

export function matchAnyPattern<GFunction extends (...args: any) => any>(
  fnc: GFunction,
): PatternMatcher<GFunction> {
  return patternMatcher<GFunction>(((): boolean => true) as MatchPatternFunction<GFunction>, fnc);
}

/*--*/

export type AggregatedPatternMatchers<GFunction> = (
  GFunction extends any ? (x: GFunction) => void : never
) extends (x: infer GOverloaded) => void
  ? GOverloaded
  : never;

export function aggregatePatternMatchers<GFunction extends PatternMatcher<(...args: any) => any>>(
  patterMatchers: GFunction[],
): AggregatedPatternMatchers<GFunction> {
  return patternMatcher<any>(
    function (this: ThisParameterType<GFunction>, ...args: any[]): boolean {
      for (const fnc of patterMatchers) {
        if (Reflect.apply(Reflect.get(fnc, MATCH_PATTERN), this, args)) {
          return true;
        }
      }
      return false;
    },
    function (
      this: ThisParameterType<GFunction>,
      ...args: Parameters<GFunction>
    ): ReturnType<GFunction> {
      for (const fnc of patterMatchers) {
        if (Reflect.apply(Reflect.get(fnc, MATCH_PATTERN), this, args)) {
          return Reflect.apply(fnc, this, args);
        }
      }
      throw new Error('No matching function.');
    },
  );
}

/*---*/

export function match() {}
