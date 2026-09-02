import type { Rgba } from '../types/rgba/rgba.ts';
import { rgbaToOpenscadBlock } from '../types/rgba/to/openscad/rgba-to-openscad-block.ts';
import { BOM } from './bom.ts';

export interface MaterialOptions {
  readonly color?: Rgba;
  readonly shopUrl?: string;
  readonly technicalDocumentationUrl?: string;
  readonly unitPrice?: number;
  readonly quantity?: number;
}

export class Material {
  readonly color: Rgba | undefined;
  readonly shopUrl: string | undefined;
  readonly technicalDocumentationUrl: string | undefined;
  readonly unitPrice: number | undefined;
  readonly quantity: number;

  constructor({
    color,
    shopUrl,
    technicalDocumentationUrl,
    unitPrice,
    quantity = 1,
  }: MaterialOptions = {}) {
    this.color = color;
    this.shopUrl = shopUrl;
    this.technicalDocumentationUrl = technicalDocumentationUrl;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
  }

  get totalPrice(): number | undefined {
    return this.unitPrice === undefined ? undefined : this.unitPrice * this.quantity;
  }

  toOpenScad(content: string): string {
    return this.color === undefined ? content : rgbaToOpenscadBlock(this.color, content);
  }
}
