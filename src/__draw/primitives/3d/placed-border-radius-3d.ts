import { IBorderRadius3dOptions, borderRadius3d } from './border-radius-3d.ts';
import { Lines } from '../../../misc/lines/lines.ts';
import {
  vec3,
  vec3_from_values,
  vec3_subtract,
  vec3_create,
  vec3_cross,
  vec3_angle,
  vec3_length,
  vec3_equals,
  vec3_zero, vec3_copy, vec3_normalize, vec3_scale,
} from '@lifaon/math';
import { RAD_TO_DEG, DEG_TO_RAD } from '../../../math/units/angle/deg-to-rad.ts';
import { union } from '../../modeling/union.ts';
import { translate } from '../../transformations/translate.ts';
import { rotateAround } from '../../transformations/rotate.ts';
import { polyhedron } from './polyhedron.ts';
import { linearExtrude } from '../../transformations/linear-extrude.ts';
import { polygon } from '../2d/polygon.ts';
import { EPSILON } from '../../../math/epsilon.ts';

export interface IPlacedBorderRadius3dOptions {
  points: [
    number, number, number, // point A
    number, number, number, // point B
    number, number, number, // point C
    number, number, number, // point D
  ];
  face1: [number, number, number],
  face2: [number, number, number],
  radius: number;
  thickness?: number;
  fragmentNumber?: number;
}

export function placedBorderRadius3d(options: IPlacedBorderRadius3dOptions): Lines {
  throw 'TODO';
}

/**
 * @deprecated
 */
export function _placedBorderRadius3d(
  {
    points,
    face1,
    face2,
    radius,
    thickness = EPSILON,
    fragmentNumber = 20,
  }: IPlacedBorderRadius3dOptions,
): Lines {

  const point_vectors: [vec3, vec3, vec3, vec3] = [
    vec3_from_values(points[0], points[1], points[2]),
    vec3_from_values(points[3], points[4], points[5]),
    vec3_from_values(points[6], points[7], points[8]),
    vec3_from_values(points[9], points[10], points[11]),
  ];

  // face X: [face_X_point_1_index, face_X_point_2_index, face_X_point_3_index]

  const face_1_single_point_index: number = face1.findIndex((i: number): boolean => {
    return !face2.includes(i);
  });

  const face_1_point_1_index: number = face1[face_1_single_point_index];
  const face_1_point_2_index: number = face1[(face_1_point_1_index + 1) % 3];
  const face_1_point_3_index: number = face1[(face_1_point_1_index + 2) % 3];

  const face_2_single_point_index: number = face2.findIndex((i: number): boolean => {
    return !face1.includes(i);
  });

  const face_2_point_1_index: number = face2[face_2_single_point_index];
  const face_2_point_2_index: number = face2[(face_2_single_point_index + 1) % 3];
  const face_2_point_3_index: number = face2[(face_2_single_point_index + 2) % 3];

  // console.log(face_1_point_1_index, face_1_point_2_index, face_1_point_3_index);
  // console.log(face_2_point_1_index, face_2_point_2_index, face_2_point_3_index);

  const face_1_point_1: vec3 = point_vectors[face_1_point_1_index];
  const face_1_point_2: vec3 = point_vectors[face_1_point_2_index];
  const face_1_point_3: vec3 = point_vectors[face_1_point_3_index];

  const face_2_point_1: vec3 = point_vectors[face_2_point_1_index];
  const face_2_point_2: vec3 = point_vectors[face_2_point_2_index];
  const face_2_point_3: vec3 = point_vectors[face_2_point_3_index];

  // console.log(face_1_point_1, face_1_point_2, face_1_point_3);
  // console.log(face_2_point_1, face_2_point_2, face_2_point_3);

  const face_1_point_1_2_vector: vec3 = vec3_subtract(vec3_create(), face_1_point_2, face_1_point_1);
  const face_1_point_2_3_vector: vec3 = vec3_subtract(vec3_create(), face_1_point_3, face_1_point_2);
  const face_2_point_1_2_vector: vec3 = vec3_subtract(vec3_create(), face_2_point_2, face_2_point_1);
  const face_2_point_2_3_vector: vec3 = vec3_subtract(vec3_create(), face_2_point_3, face_2_point_2);

  // console.log(face_1_point_1_2_vector, face_1_point_2_3_vector);

  const face_1_cross_vector: vec3 = vec3_cross(vec3_create(), face_1_point_2_3_vector, face_1_point_1_2_vector);
  const face_2_cross_vector: vec3 = vec3_cross(vec3_create(), face_2_point_2_3_vector, face_2_point_1_2_vector);

  console.log('face_1_and_2_cross_vector', face_1_cross_vector, face_2_cross_vector);

  // const angle_between_faces: number = vec3_angle(face_1_cross_vector, face_2_cross_vector);
  // const angle_between_faces_as_deg: number = angle_between_faces * RAD_TO_DEG;
  //
  // console.log('angle_between_faces_as_deg', angle_between_faces_as_deg);
  //
  // const initial_vector = vec3_from_values(0, 0, 1);

  const edge_vector: vec3 = face_1_point_2_3_vector;
  console.log('edge_vector', edge_vector);

  const face_5: vec3 = vec3_create();
  vec3_scale(face_5, vec3_normalize(face_5, vec3_cross(face_5, edge_vector, face_1_cross_vector)), radius);
  console.log('face_5', face_5);

  const _points: readonly number[] = [
    ...face_1_point_2,
  ];

  console.log(_points);

  return polyhedron({
    points: _points,
    faces: [
      [0, 1, 2], // xy plane
      [0, 3, 1], // xz plane
      [0, 2, 3], // yz plane
      [1, 3, 2],
    ],
  });

  // return union([
  //   translate(translation_vector as any, [
  //     rotateAround({
  //       angle: angle_between_initial_vector_and_edge_vector_as_deg,
  //       vector: rotation_cross_vector as any,
  //     }, [
  //       borderRadius3d({
  //         ...options,
  //         angle: angle_between_faces_as_deg,
  //         length: edge_vector_length,
  //       }),
  //     ]),
  //   ]),
  // ]);
}


/*
placedBorderRadius3d({
        radius: 1,

        points: [
          0, 0, 0,
          10, 0, 10,
          10, 0, 0,
          10, 10, 0,
        ],
        face1: [0, 1, 2],
        face2: [2, 1, 3],

        // points: [
        //   0, 0, 0,
        //   10, 0, 0,
        //   10, 10, 0,
        //   10, 0, 10,
        // ],
        // face1: [0, 1, 2],
        // face2: [1, 3, 2],

        // points: [
        //   0, 0, 10,
        //   10, 10, 10,
        //   10, 0, 10,
        //   10, 0, 0,
        // ],
        // face1: [0, 1, 2],
        // face2: [3, 2, 1],
      }),

 */
