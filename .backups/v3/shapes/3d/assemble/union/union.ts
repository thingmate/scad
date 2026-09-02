import { dedent } from '../../../../misc/string/dedent/dedent.ts';
import { Shape3d } from '../../shape-3d.ts';

export class Union extends Shape3d {
  readonly shapes: readonly Shape3d[];

  constructor(shapes: readonly Shape3d[]) {
    super();
    this.shapes = shapes;
  }

  override toOpenscad(): string {
    return dedent`
      union() {
        ${this.shapes.map((shape: Shape3d): string => shape.toOpenscad()).join('\n')}
      }
    `;
  }
}

/*--*/

export function union(shapes: readonly Shape3d[]): Union {
  return new Union(shapes);
}
