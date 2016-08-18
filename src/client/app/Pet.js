import React from 'react';

const Pet = ({pet}) =>
  <tr >
    <td><span>{pet.id.$t}</span></td>
    <td><span>{pet.animal.$t}</span></td>
    <td><span>{pet.name.$t}</span></td>
    <td><span>{pet.age.$t}</span></td>
    <td><span>{pet.sex.$t}</span></td>
    <td><span>{pet.size.$t}</span></td>
  </tr>

export default Pet;