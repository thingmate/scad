import { mm } from '../../../../../math/units/length/1d/mm.ts';
import { Material } from '../../../../../scene/material.ts';
import { Part } from '../../../../../scene/part.ts';
import { Shape } from '../../../../../scene/shape.ts';
import { COLOR_WOOD_FIBER } from '../../../../../types/rgba/built-in/wood-fiber.ts';

export function part_wood_fiber_insulation_steico_flex_240x1220x600(): Part {
  return new Part({
    name: 'steico_flex_240x1220x600',
    shape: Shape.cube(mm(600), mm(240), mm(1220)),
    material: new Material({
      color: COLOR_WOOD_FIBER,
      shopUrl:
        'https://www.materiaux-naturels.fr/produit-decl/6851-steico-flex-f-036-panneau-laine-de-bois-240mm-1220x565',
      unitPrice: 31.12,
      technicalDocumentationUrl: 'https://www.materiaux-naturels.fr/doc/product/n_1477.pdf',
    }),
  });
}
