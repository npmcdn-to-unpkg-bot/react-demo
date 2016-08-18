import React from 'react';

class PetHeader extends React.Component {
	constructor(props) {
		//prop required or undef
		super(props);
		//carry prop from parent into current state
		this.state = {
			search: ''
		}
	}

	render() {
		return (
			<div className="page-header">
				<div className="pet-finder-logo"></div>
				<div className="col-md-4 search">
					<input placeholder="Search by Pet #" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} className="form-control"/>
				</div>
			</div>
		)
	}
}

export default PetHeader;