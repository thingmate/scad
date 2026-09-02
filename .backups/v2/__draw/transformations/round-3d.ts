import { Lines } from '../../misc/lines/lines.ts';
import { offset3d } from './offset-3d.ts';

export interface IRound3dOptions {
  readonly radius?: number;
  readonly radiusInner?: number;
  readonly radiusOuter?: number;
  readonly chamferBase?: boolean;
}

/**
 * Applies a "round-3d" transformation on a block of code.
 *
 * @experimental
 * @inheritDoc https://github.com/nophead/NopSCADlib/blob/master/utils/round.scad
 */
export function round3d(
  {
    radius,
    radiusInner = radius,
    radiusOuter = radius,
    chamferBase = false,
  }: IRound3dOptions,
  expressions: readonly Lines[],
): Lines {

  return offset3d({ radius: radiusOuter, chamferBase }, [
    offset3d({ radius: (-radiusOuter! - radiusInner!), chamferBase }, [
      offset3d({ radius: radiusInner, chamferBase }, expressions),
    ]),
  ]);
  /*
  module round_3D(r, ir = undef, or = undef, chamfer_base = false) { //! Round a 3D child single radius or separate inside and outside radii
    IR = is_undef(ir) ? r : ir;
    OR = is_undef(or) ? r : or;
    offset_3D(OR, chamfer_base)
        offset_3D(-OR -IR, chamfer_base)
            offset_3D(IR, chamfer_base)
                children();
}
   */
}
