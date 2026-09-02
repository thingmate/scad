import { Shape3d } from '../../shape-3d.ts';

export class Model3d extends Shape3d {
  readonly path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  /**
   * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Importing_Geometry#import
   */
  override toOpenscad(): string {
    return super.toOpenscad(`import(${this.path});`);
  }
}

/*--*/

export function model3d(path: string): Model3d {
  return new Model3d(path);
}
