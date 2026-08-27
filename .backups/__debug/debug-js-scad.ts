import scad from 'npm:scad-js@^0.5.0';

const { cylinder, difference, sphere } = scad;

export function debugJSScad() {
// const size = 50;
// const hole = size / 2;
// const cylinderHeight = size * 2.5;
//
// const output = difference(
//   sphere(size),
//   cylinder(cylinderHeight, hole).rotate([0, 0, 0]),
//   cylinder(cylinderHeight, hole).rotate([0, 90, 0]).debug(),
//   cylinder(cylinderHeight, hole).rotate([90, 0, 0]),
// );
// console.log(output);
  console.log(scad);

// fs.writeFileSync('./dist/output.scad', output.serialize({ $fn: 100 }));

}
