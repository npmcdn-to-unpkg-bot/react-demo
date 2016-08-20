NOTES and STRUGGLES:

- passing function to parent testing
<button onClick={this.props.loadPetsFromServer.bind(this)}> More Pets</button>

- loaders:
npm i extract-text-webpack-plugin
npm install jsx-loader style-loader css-loader less-loader --save-dev

- contained constant:
const Pet1 = ({pet}) =>
  <tr >
    <td><span>{pet.id.$t}</span></td>
    <td><span>{pet.animal.$t}</span></td>
    <td><span>{pet.name.$t}</span></td>
    <td><span>{pet.age.$t}</span></td>
    <td><span>{pet.sex.$t}</span></td>
    <td><span>{pet.size.$t}</span></td>
  </tr>

- MUST BE LISTENER NOT "" STRINGS!!!!
    onClick={this.loadPetsFromServer}
- no states in render