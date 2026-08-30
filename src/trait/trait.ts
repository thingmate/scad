export interface Typed<GType extends symbol = any> {
  readonly $type: GType;
}

/*--*/

// export interface Trait {
//   ():
// }

export type TraitDefinitionConstraint = (self: Typed, ...args: any) => any;

// export type TraitImplementationConstraint<
//   GImplementation,
//   GTraitDefinition extends TraitDefinitionConstraint,
// > = GImplementation extends (self: infer GSelf, ...args: any) => any ? null : never;
// // (self: Typed, ...args: any) => any;

// type A<G extends <U>() => number> = G extends <infer U>() => number ? null : any;

// export type TraitImplementationType<
//   GImplementation extends (...args: any) => any,
//   GTraitDefinition extends TraitDefinitionConstraint,
// > = GImplementation extends (self: infer GImplSelf, ...args: infer GImplArgs) => any
//   ? GImplementation extends (self: infer GSelf, ...args: infer GArgs) => any
//     ? null
//     : never
//   : never;
// (self: Typed, ...args: any) => any;

export type TraitImplementationConstraint<GTraitDefinition extends TraitDefinitionConstraint> =
  GTraitDefinition extends (self: infer GSelf, ...args: infer GArgs) => infer GReturn
    ? (self: GSelf, ...args: GArgs) => GReturn
    : never;

export type Trait<GTraitDefinition extends TraitDefinitionConstraint> = GTraitDefinition & {
  implement<GImplementation extends TraitImplementationConstraint<GTraitDefinition>>(
    $type: symbol,
    implementation: GImplementation,
  ): void;
};

export function trait<
  GTraitDefinition extends TraitDefinitionConstraint,
>(): Trait<GTraitDefinition> {
  throw new Error('Not implemented');
}

/*--*/

// export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
//   x: infer I,
// ) => void
//   ? I
//   : never;

/*--*/

export interface TypedDefinition<GTyped extends Typed> {
  create(properties: Omit<GTyped, '$type'>): GTyped;

  implementation<GFunction extends (self: GTyped, ...args: any[]) => any>(
    fnc: GFunction,
  ): Implementation<GTyped['$type'], GFunction>;
}

export function typed<GTyped extends Typed>($type: GTyped['$type']): TypedDefinition<GTyped> {
  return {
    create(properties: Omit<GTyped, '$type'>): GTyped {
      return { ...properties, $type } as GTyped;
    },
    implementation<GFunction extends (self: GTyped, ...args: any[]) => any>(
      fnc: GFunction,
    ): Implementation<GTyped['$type'], GFunction> {
      return Object.assign(fnc, { $for: $type });
    },
  };
}

/*--*/

export type Implementation<
  GTyped extends Typed = any,
  GFunction extends (self: GTyped, ...args: any[]) => any = any,
> = GFunction & {
  readonly $for: GTyped['$type'];
};

/*--*/

export type OverloadResult<GImplementation extends Implementation> = (
  GImplementation extends any ? (x: GImplementation) => void : never
) extends (x: infer GResult) => void
  ? GResult
  : never;

export function overload<GImplementation extends Implementation>(
  implementations: Iterable<GImplementation>,
): OverloadResult<GImplementation> {
  const map: Map<symbol, Implementation> = new Map();

  for (const implementation of implementations) {
    map.set((implementation as Implementation).$for, implementation);
  }
  return ((self: Typed, ...args: any[]): any => {
    return map.get(self.$type)!(self, ...args);
  }) as any;
}
