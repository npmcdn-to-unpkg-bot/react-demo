NOTES and STRUGGLES:

- passing function to parent testing
<button onClick={this.props.loadPetsFromServer.bind(this)}> More Pets</button>

- loaders:
npm i extract-text-webpack-plugin
npm install jsx-loader style-loader css-loader less-loader --save-dev


- MUST BE LISTENER NOT "" STRINGS!!!!
    onClick={this.loadPetsFromServer}
- no states in render