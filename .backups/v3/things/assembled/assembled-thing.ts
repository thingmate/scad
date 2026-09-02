import { BOM } from '../../bom/bom.ts';
import { Thing, type ThingOptions } from '../thing.ts';

export interface AssembledThingOptions extends ThingOptions {
  readonly children: readonly Thing[];
}

export class AssembledThing extends Thing {
  readonly children: readonly Thing[];

  constructor({ children, ...options }: AssembledThingOptions) {
    super(options);
    this.children = children;
  }

  override toOpenscad(): string {
    let output: string = '';
    for (const child of this.children) {
      if (output !== '') {
        output += '\n';
      }
      output += child.toOpenscad();
    }
    return super.toOpenscad(output);
  }

  override toBOM(bom: BOM = new BOM()): BOM {
    if (this.shopUrl !== undefined || this.price !== undefined) {
      bom.add(this.name, this);
    } else {
      for (const child of this.children) {
        child.toBOM(bom);
      }
    }
    return bom;
  }
}

/*--*/

export function assembledThing(options: AssembledThingOptions): AssembledThing {
  return new AssembledThing(options);
}
