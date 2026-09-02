import { overload, trait, typed, type Typed } from './trait/trait.ts';
import { dedent } from './misc/string/dedent/dedent.ts';

/*---------*/

export interface Translate {
  <GSelf extends Typed>(self: GSelf, x: number, y?: number, z?: number): GSelf;
}

export const translate = trait<Translate>();

/*--*/

export interface Difference {
  <GSelf extends Typed>(self: GSelf, ...shapes: GSelf[]): GSelf;
}

export const difference = trait<Difference>();

/*---------*/

export const VEC3 = Symbol('VEC3');

export interface Vec3 extends Typed<typeof VEC3> {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export function vec3(x: number, y: number, z: number): Vec3 {
  return {
    $type: VEC3,
    x,
    y,
    z,
  };
}
// TODO continue here
export function implement_vec3_translate(): void {
  translate.implement(VEC3, (self: Vec3, x: number, y: number = 0, z: number = 0): Vec3 => {
    return vec3(self.x + x, self.y + y, self.z + z);
  });
}

/*---------*/

export const OPENSCAD_CODE = Symbol('OPENSCAD_CODE');

export interface OpenscadCode extends Typed<typeof OPENSCAD_CODE> {
  readonly code: string;
}

export function openscadCode(code: string): OpenscadCode {
  return {
    $type: OPENSCAD_CODE,
    code,
  };
}

export function cube(x: number, y: number, z: number): OpenscadCode {
  return openscadCode(`cube(size = [${x}, ${y}, ${z}], center = true);`);
}

export function implement_openscadCode_translate(): void {
  translate.implement(
    OPENSCAD_CODE,
    (self: OpenscadCode, x: number, y: number = 0, z: number = 0): OpenscadCode => {
      return openscadCode(
        dedent`
          translate([${String(x)}, ${String(y)}, ${String(z)}]) {
            ${self.code}
          }
        `,
      );
    },
  );
}

export function implement_openscadCode_difference(): void {
  difference.implement(
    OPENSCAD_CODE,
    (self: OpenscadCode, ...shapes: OpenscadCode[]): OpenscadCode => {
      return openscadCode(
        dedent`
        difference() {
          ${self.code}
          ${shapes.map((shape: OpenscadCode): string => shape.code).join('\n')}
        }
      `,
      );
    },
  );
}

export const openscadCode_applyColor = openscadCode.implementation(
  (self: OpenscadCode, [r, g, b, a = 1]: Rgba): OpenscadCode => {
    return openscadCode.create({
      code: dedent`
         color([${String(r)}, ${String(g)}, ${String(b)}, ${String(a)}]) {}
          ${self.code}
        }
      `,
    });
  },
);

/*---------*/

export const BOM_PART = Symbol('BOM_PART');

export interface BomPart extends Typed<typeof BOM_PART> {
  readonly name: string;
  readonly shopUrl: string | undefined;
  readonly price: number | undefined;
}

export const bomPart = typed<BomPart>(BOM_PART);

// export interface BomPartOptions {
//   readonly name: string;
//   readonly shopUrl?: string;
//   readonly price?: number;
// }
//
//
//
// export function bomPart({ name, shopUrl, price }: BomPartOptions): BomPart {
//   return {
//     $type: BOM_PART,
//     name,
//     shopUrl,
//     price,
//   };
// }

export const bomPart_translate = bomPart.implementation((self: BomPart): BomPart => {
  return self;
});

/*---------*/

// export const translate = overload([vec3_translate, openscadCode_translate, bomPart_translate]);
//
// export const difference = overload([openscadCode_difference]);
//
// export const applyColor = overload([openscadCode_applyColor]);

/*---------*/

export function wood() {
  return [
    bomPart.create({
      name: 'wood',
      shopUrl: 'https://www.amazon.fr/gp/product/B000000000',
      price: 100,
    }),
    translate(applyColor(cube(1, 2, 3), [1, 0, 0, 1]), 0, 1, 2),
  ];
}

export function window(width: number, height: number) {
  return [
    bomPart.create({
      name: `window_${width}x${height}`,
      shopUrl: 'https://www.amazon.fr/gp/product/B000000000',
      price: 100,
    }),
    applyColor(cube(1, 2, 3), [1, 0, 0, 1]),
  ];
}

/*---------*/

// type A = (input: string) => boolean;
// type B = (input: number) => symbol;
//
// type C = A & B;
//
// const a: C = null as any;
//
// const t = a(1);

/*--*/

// translate(
//   vec3.create({
//     x: 1,
//     y: 2,
//     z: 3,
//   }),
//   0,
//   1,
//   2,
// );

/*---------*/

export function mainTrait() {
  implement_vec3_translate();
  implement_openscadCode_translate();

  implement_openscadCode_difference();

  // const r = translate(vec3(1, 2, 3), 10);
  // console.log([vec3(1, 2, 3), vec3(11, 12, 13)].map(translate.curry(10)));
  // console.log(r);

  const c = wood();
  console.log(c.map((_) => translate(_, 4, 5, 6)));
}
