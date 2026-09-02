import { mm } from '../../../../../math/units/length/1d/mm.ts';
import { Material } from '../../../../../scene/material.ts';
import { Part } from '../../../../../scene/part.ts';
import { Shape } from '../../../../../scene/shape.ts';
import { COLOR_WOOD } from '../../../../../types/rgba/built-in/wood.ts';

export function part_wooden_beam_80x60(length: number): Part {
  return new Part({
    name: `wooden_beam_80x60x${length}`,
    shape: Shape.cube(length, mm(80), mm(60)),
    material: new Material({
      color: COLOR_WOOD,
      shopUrl: 'https://www.etsy.com/listing/1240222222/wooden-beam-80x60-with-wood-frame',
      unitPrice: length * 10,
    }),
  });
}
