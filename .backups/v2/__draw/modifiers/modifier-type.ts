export type ModifierType =
  | 'none'
  | 'background' // https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Modifier_Characters#Background_modifier
  | 'debug' // https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Modifier_Characters#Debug_modifier
  | 'root' // https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Modifier_Characters#Root_modifier
  | 'disable' // https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Modifier_Characters#Disable_modifier
  ;

export type OpenScadModifier =
  | '' // none
  | '%' // background
  | '#' // debug
  | '!' // root
  | '*' // disable
  ;

export function toOpenSCADModifier(
  modifier: ModifierType,
): OpenScadModifier {
  switch (modifier) {
    case 'none':
      return '';
    case 'background':
      return '%';
    case 'debug':
      return '#';
    case 'root':
      return '!';
    case 'disable':
      return '*';
    default:
      throw new TypeError(`Invalid modifier`);
  }
}


