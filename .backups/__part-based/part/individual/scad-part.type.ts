import { IOpenSCADModel } from './open-scad-model/open-scad-model.type.ts';

export type ISCADPart =
  | IOpenSCADModel
  ;

export type ISCADParts = ISCADPart[];
