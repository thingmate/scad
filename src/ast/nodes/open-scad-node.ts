export interface OpenScadNode<GType extends string> {
  readonly $type: GType;
}

export type GenericOpenScadNode = OpenScadNode<string>;

export function isOpenScadNode<GType extends string>(input: GenericOpenScadNode, type: GType): input is OpenScadNode<GType> {
  return input.$type === type;
}
