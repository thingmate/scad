import { Object3d } from '../../types/object-3d/object-3d.ts';

export abstract class Shape3d extends Object3d {
  // union(...shapes: readonly Shape3d[]): Union {
  //   return new Union([this, ...shapes]);
  // }
  //
  // difference(...shapes: readonly Shape3d[]): Difference {
  //   return new Difference(this, ...shapes);
  // }
  //
  // intersection(...shapes: readonly Shape3d[]): Intersection {
  //   return new Intersection(this, ...shapes);
  // }
}
