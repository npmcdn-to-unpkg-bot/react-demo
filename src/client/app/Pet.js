import React from 'react';

class Breeds extends React.Component {
	constructor(props) {
		super(props);
		//check for mult breeds
		if(Array.isArray(this.props.pet.breeds.breed)){
			this.state = {
				id: this.props.pet.id,
				breeds: this.props.pet.breeds.breed
			};
		} else {
			this.state = {
				id: this.props.pet.id.$t,
				breed: this.props.pet.breeds.breed
			};
		}
	}
   	render() {
   		if(this.state.breeds){
   			var petid = this.state.id.$t;
			return (
				<h4>
					<ul className="list-unstyled">
						{this.state.breeds.map(function(breed, petid) {
							//set petId as uniqye key
		                    return <li key={petid}>{breed.$t}</li>
		                })}
	               	</ul>
            	</h4>
			);
   		} else {
   			return (
				<h4 key={this.state.id}>{this.state.breed.$t}</h4>
			);
   		}
    }
};


class PetInfo extends React.Component {
	constructor(props) {
		super(props);
	}
   	render() {
        return (
            <tr>
	            <td colSpan="6" className="pet-breakdown">
	            	<span className="col-md-2">
	            		<img src={this.props.pet.media.photos.photo[0].$t} width="120" height="120" />
	               	</span>
	               	<span className="col-md-7">
	               		<h2>{this.props.pet.name.$t}</h2>
	               		<Breeds pet={this.props.pet}/>
	               		<p>{this.props.pet.description.$t}</p>
	               	</span>
	               	<span className="col-md-3">
	               		<h4>Contact Info</h4>
						<ul>
							<li>{this.props.pet.contact.address1.$t}</li>
							<li></li>
							<li></li>
						</ul>
	               	</span>
	            </td>
            </tr>
        );
    }
};

class Pet extends React.Component {
    constructor(props) {
        super(props);
        //carry prop from parent into current state
    	this.state = {
	      showPetInfo: false
	    };
    }
    petInfoClick() {
        this.setState({
        	showPetInfo: true
        });
    }
    render() {
        return (
        	<tbody>
				<tr onClick={this.petInfoClick.bind(this)}>
					<td><span>{this.props.pet.id.$t}</span></td>
					<td><span>{this.props.pet.animal.$t}</span></td>
					<td><span>{this.props.pet.name.$t}</span></td>
					<td><span>{this.props.pet.age.$t}</span></td>
					<td><span>{this.props.pet.sex.$t}</span></td>
					<td><span>{this.props.pet.size.$t}</span></td>
				</tr>
				{this.state.showPetInfo ? <PetInfo pet={this.props.pet}/> : null}
			</tbody>
        )
    }
}

export default Pet;