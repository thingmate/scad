import { dedent } from '../../../../misc/string/dedent/dedent.ts';
import { Shape3d } from '../../shape-3d.ts';

export class Difference extends Shape3d {
  readonly shapes: readonly Shape3d[];

  constructor(shapes: readonly Shape3d[]) {
    super();
    if (shapes.length < 2) {
      throw new Error('Difference requires at least 2 shapes');
    }
    this.shapes = shapes;
  }

  override toOpenscad(): string {
    return dedent`
      difference() {
        ${this.shapes.map((shape: Shape3d): string => shape.toOpenscad()).join('\n')}
      }
    `;
  }
}

/*--*/

export function difference(shapes: readonly Shape3d[]): Difference {
  return new Difference(shapes);
}
