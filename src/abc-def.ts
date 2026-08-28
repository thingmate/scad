export interface Typed<GType extends symbol> {
  readonly $type: GType;
}

export type GenericTyped = Typed<any>;

/*--*/

export type GenericTrait = (self: GenericTyped, ...args: any[]) => any;

export type InferTraitSelf<GTrait extends GenericTrait> = GTrait extends (
  self: infer GSelf,
  ...args: any[]
) => any
  ? GSelf
  : never;

export type InferTraitParameters<GTrait extends GenericTrait> = GTrait extends (
  self: GenericTyped,
  ...args: infer GParameters
) => any
  ? GParameters
  : never;

export type CurriedTrait<GTrait extends GenericTrait> = (
  self: InferTraitSelf<GTrait>,
) => ReturnType<GTrait>;

/*--*/

export interface Implementation {
  (): void;
}

/*--*/

export type Trait<GTrait extends GenericTrait> = GTrait & {
  implement<GTyped extends InferTraitSelf<GTrait>>(
    $type: GTyped['$type'],
    implementation: (self: GTyped, ...args: InferTraitParameters<GTrait>) => ReturnType<GTrait>,
  ): void;

  implementation<GTyped extends InferTraitSelf<GTrait>>(
    $type: GTyped['$type'],
    implementation: (self: GTyped, ...args: InferTraitParameters<GTrait>) => ReturnType<GTrait>,
  ): Implementation;

  curry(...args: InferTraitParameters<GTrait>): CurriedTrait<GTrait>;
};

export function trait<GTrait extends GenericTrait>(): Trait<GTrait> {
  const implementations: Map<InferTraitSelf<GTrait>, GTrait> = new Map();

  const fnc = (
    self: InferTraitSelf<GTrait>,
    ...args: InferTraitParameters<GTrait>
  ): ReturnType<GTrait> => {
    return implementations.get(self.$type)!(self, ...args);
  };

  const implement = <GTyped extends InferTraitSelf<GTrait>>(
    $type: GTyped['$type'],
    implementation: (self: GTyped, ...args: InferTraitParameters<GTrait>) => ReturnType<GTrait>,
  ): void => {
    if (implementations.has($type)) {
      throw new Error(`Trait already implemented for type ${$type}`);
    }
    implementations.set($type, implementation as GTrait);
  };

  return Object.assign(fnc, {
    implement,
    implementation<GTyped extends InferTraitSelf<GTrait>>(
      $type: GTyped['$type'],
      implementation: (self: GTyped, ...args: InferTraitParameters<GTrait>) => ReturnType<GTrait>,
    ): Implementation {
      return (): void => {
        implement($type, implementation);
      };
    },
    curry(...args: InferTraitParameters<GTrait>): CurriedTrait<GTrait> {
      return (self: InferTraitSelf<GTrait>): ReturnType<GTrait> => {
        return fnc(self, ...args);
      };
    },
  }) as unknown as Trait<GTrait>;
}

/*---------*/

export interface TranslateTrait {
  <GSelf extends GenericTyped>(self: GSelf, x: number, y?: number, z?: number): GSelf;
}

const translate = trait<TranslateTrait>();

/*--*/

interface Vec3 extends Typed<typeof VEC3> {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

function vec3(x: number, y: number, z: number): Vec3 {
  return {
    $type: VEC3,
    x,
    y,
    z,
  };
}

const VEC3 = Symbol('vec3');

const implement_vec3_translate = translate.implementation<Vec3>(
  VEC3,
  (self: Vec3, x: number, y: number = 0, z: number = 0): Vec3 => {
    return vec3(self.x + x, self.y + y, self.z + z);
  },
);

/*---------*/

export interface ToOpenscadTrait {
  (self: GenericTyped): string;
}

/*---------*/

export function mainTrait() {
  implement_vec3_translate();

  const r = translate(vec3(1, 2, 3), 10);
  console.log([vec3(1, 2, 3), vec3(11, 12, 13)].map(translate.curry(10)));
  console.log(r);
}
