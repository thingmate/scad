export interface AddBOMEntry {
  readonly quantity?: number;
  readonly shopUrl?: string;
  readonly price?: number;
}

export interface BOMEntry {
  readonly quantity: number;
  readonly shopUrl?: string;
  readonly price?: number;
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

  add(name: string, { quantity = 1, shopUrl, price }: AddBOMEntry = {}): this {
    const entry: BOMEntry | undefined = this.#entries.get(name);

    if (entry === undefined) {
      this.#entries.set(name, {
        quantity,
        shopUrl,
        price,
      });
    } else {
      if (entry.shopUrl !== undefined && shopUrl !== undefined && entry.shopUrl !== shopUrl) {
        throw new Error(
          `BOM entry ${name} already has a different shop URL: ${entry.shopUrl} vs ${shopUrl}`,
        );
      }

      if (entry.price !== undefined && price !== undefined && entry.price !== price) {
        throw new Error(
          `BOM entry ${name} already has a different price: ${entry.price} vs ${price}`,
        );
      }

      this.#entries.set(name, {
        quantity: entry.quantity + quantity,
        shopUrl: shopUrl ?? entry.shopUrl,
        price: price ?? entry.price,
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
  toCSV(): string {
    let output: string = 'name,shop url, unit price, quantity, total price\r\n';

    for (const [name, { quantity, shopUrl, price }] of this.entries()) {
      output += `${formatCell(name)},${formatOptionalCell(shopUrl)},${price === undefined ? '' : price},${quantity},${price === undefined ? '' : price * quantity}\r\n`;
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
