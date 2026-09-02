export interface AddBOMEntry {
  readonly quantity?: number;
  readonly shopUrl?: string;
  readonly unitPrice?: number;
}

export interface BOMEntry {
  readonly quantity: number;
  readonly shopUrl?: string;
  readonly unitPrice?: number;
}

export interface BOMToCSVOptions {
  readonly withTotal?: boolean;
}

export class BOM {
  readonly #entries: Map<string /* name */, BOMEntry>;

  constructor() {
    this.#entries = new Map();
  }

  has(name: string): boolean {
    return this.#entries.has(name);
  }

  get(name: string): BOMEntry | undefined {
    return this.#entries.get(name);
  }

  add(name: string, { quantity = 1, shopUrl, unitPrice }: AddBOMEntry = {}): this {
    const entry: BOMEntry | undefined = this.#entries.get(name);

    if (entry === undefined) {
      this.#entries.set(name, {
        quantity,
        shopUrl,
        unitPrice: unitPrice,
      });
    } else {
      if (entry.shopUrl !== undefined && shopUrl !== undefined && entry.shopUrl !== shopUrl) {
        throw new Error(
          `BOM entry ${name} already has a different shop URL: ${entry.shopUrl} vs ${shopUrl}`,
        );
      }

      if (
        entry.unitPrice !== undefined &&
        unitPrice !== undefined &&
        entry.unitPrice !== unitPrice
      ) {
        throw new Error(
          `BOM entry ${name} already has a different price: ${entry.unitPrice} vs ${unitPrice}`,
        );
      }

      this.#entries.set(name, {
        quantity: entry.quantity + quantity,
        shopUrl: shopUrl ?? entry.shopUrl,
        unitPrice: unitPrice ?? entry.unitPrice,
      });
    }

    return this;
  }

  entries(): IterableIterator<[string, BOMEntry]> {
    return this.#entries.entries();
  }

  /**
   * @inheritDoc https://en.wikipedia.org/wiki/Comma-separated_values
   */
  toCSV({ withTotal = false }: BOMToCSVOptions = {}): string {
    let output: string = 'name,shop url, unit price, quantity, total price\r\n';

    let totalQuantity: number = 0;
    let totalPrice: number = 0;

    for (const [name, { quantity, shopUrl, unitPrice }] of this.entries()) {
      const totalPriceForEntry: number = unitPrice === undefined ? 0 : unitPrice * quantity;

      output += `${formatCell(name)},${formatOptionalCell(shopUrl)},${unitPrice === undefined ? '' : unitPrice},${quantity},${totalPriceForEntry}\r\n`;
      totalQuantity += quantity;
      totalPrice += totalPriceForEntry;
    }

    if (withTotal) {
      output += `total,,,${totalQuantity},${totalPrice}\r\n`;
    }

    return output;
  }
}

/*---*/

function formatOptionalCell(input: string | undefined): string {
  return input === undefined ? '' : formatCell(input);
}

function formatCell(input: string): string {
  if (input.includes(',') || input.includes('"') || input.includes('\r') || input.includes('\n')) {
    return `"${input.replaceAll('"', '""')}"`;
  } else {
    return input;
  }
}
