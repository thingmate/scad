import { mm } from '../../../../../math/units/length/1d/mm.ts';
import { area } from '../../../../../math/units/length/2d/area.ts';
import { Material } from '../../../../../scene/material.ts';
import { Part } from '../../../../../scene/part.ts';
import { Shape } from '../../../../../scene/shape.ts';
import { rgba } from '../../../../../types/rgba/create/rgba.ts';

export function part_airtightness_aerosana_visconn(width: number, height: number): Part {
  return new Part({
    name: `aerosana_visconn_${width}x${height}`,
    shape: Shape.cube(width, mm(0.5), height),
    material: new Material({
      color: rgba('#ffffff'),
      shopUrl:
        'https://www.materiaux-naturels.fr/produit/1526-pate-d-etancheite-a-l-air-aerosana-visconn',
      // https://www.leroymerlin.fr/produits/aerosana-visconn-10l-enduit-etancheite-pulverisable-bleu-noir-91202455.html
      unitPrice: 173.91,
      // 10l and 0.75l/m2
      quantity: (area(width, height) * 0.75) / 10,
    }),
  });
}
