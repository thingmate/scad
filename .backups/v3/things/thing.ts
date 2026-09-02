import type { BOM } from '../bom/bom.ts';
import { dedent } from '../misc/string/dedent/dedent.ts';
import { Object3d } from '../types/object-3d/object-3d.ts';

export interface ThingOptions {
  readonly name: string;
  readonly shopUrl?: string;
  readonly price?: number;
}

export abstract class Thing extends Object3d {
  readonly name: string;
  readonly shopUrl: string | undefined;
  readonly price: number | undefined;

  constructor({ name, shopUrl, price }: ThingOptions) {
    super();
    this.name = name;
    this.shopUrl = shopUrl;
    this.price = price;
  }

  override toOpenscad(content?: string): string {
    return dedent`
      // thing: ${this.name}
      ${super.toOpenscad(content)}
    `;
  }

  abstract toBOM(input?: BOM): BOM;
}
