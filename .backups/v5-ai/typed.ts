export interface Typed<GType extends symbol = any> {
  readonly $type: GType;
}
