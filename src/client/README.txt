Notes:

- passing function to parent testing
<button onClick={this.props.loadPetsFromServer.bind(this)}> More Pets</button>




const Pet1 = ({pet}) =>
  <tr >
    <td><span>{pet.id.$t}</span></td>
    <td><span>{pet.animal.$t}</span></td>
    <td><span>{pet.name.$t}</span></td>
    <td><span>{pet.age.$t}</span></td>
    <td><span>{pet.sex.$t}</span></td>
    <td><span>{pet.size.$t}</span></td>
  </tr>