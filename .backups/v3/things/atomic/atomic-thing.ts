import { BOM } from '../../bom/bom.ts';
import { dedent } from '../../misc/string/dedent/dedent.ts';
import type { Shape3d } from '../../shapes/3d/shape-3d.ts';
import type { Rgba } from '../../types/rgba/rgba.ts';
import { rgbaToOpenscad } from '../../types/rgba/to/openscad/rgba-to-openscad.ts';
import { Thing, type ThingOptions } from '../thing.ts';

export interface AtomicThingOptions extends ThingOptions {
  readonly color: Rgba;
  readonly shape: Shape3d;
}

export class AtomicThing extends Thing {
  readonly color: Rgba;
  readonly shape: Shape3d;

  constructor({ color, shape, ...options }: AtomicThingOptions) {
    super(options);
    this.color = color;
    this.shape = shape;
  }

  override toOpenscad(): string {
    return super.toOpenscad(
      dedent`
        color(c = ${rgbaToOpenscad(this.color)}) {
          ${this.shape.toOpenscad()}
        }
      `,
    );
  }

  override toBOM(bom: BOM = new BOM()): BOM {
    bom.add(this.name, this);
    return bom;
  }
}

/*--*/

export function atomicThing(options: AtomicThingOptions): AtomicThing {
  return new AtomicThing(options);
}
