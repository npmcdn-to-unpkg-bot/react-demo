import React from 'react';

class Breeds extends React.Component {
	constructor(props) {
		super(props);
		//check for mult breeds
		if(Array.isArray(this.props.pet.breeds.breed)){
			this.state = {
				breeds: this.props.pet.breeds.breed
			};
		} else {
			this.state = {
				breed: this.props.pet.breeds.breed
			};
		}
	}
   	render() {
   		//if mult, then array
   		if(this.state.breeds){
			return (
				<h4>
					<ul className="list-unstyled">
						{this.state.breeds.map(function(breed, index) {
							//set petId as unique key
		                    return <li key={index}>{breed.$t}</li>
		                })}
	               	</ul>
            	</h4>
			);
   		} else {
   			return (
				<h4>{this.state.breed.$t}</h4>
			);
   		}
    }
};

class PetImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgsrc: this.props.source,
			imgstatus: 'loading'
		};
	}
	//once image finished
	handleImageLoaded() {
		this.setState({ imgstatus: 'loaded' });
	}
	//handles spinner
	renderSpinner() {
		if (this.state.imgstatus !== 'loading') {
			//after image loaded, lets remove spinner
			return null;
		}
		return (
			<div className="spinner">
                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            </div>
		);
	}
	render() {
		//lets clean up the image url, CANNOT USE SET STATE in render..
		if(this.state.imgsrc){
			var newSource = this.state.imgsrc;
			newSource = newSource.substring(0, newSource.length - 18).concat(".jpg");
		}
        return (
        	<div>
        		{this.renderSpinner()}
	        	<img src={newSource} onLoad={this.handleImageLoaded.bind(this)} width="150" height="150" />
	       	</div>

        )
    }
}

class PetInfo extends React.Component {
	constructor(props) {
		super(props);
	}
   	render() {
        return (
            <tr>
	            <td colSpan="7" className="pet-breakdown">
	            	<a className="breakdown-toggle glyphicon glyphicon-chevron-up close-chevron" href="javascript:;" onClick={this.props.petInfoClick}></a>
	            	<span className="col-md-2">
	            		<PetImage source={this.props.pet.media.photos.photo[0].$t} />
	               	</span>
	               	<span className="col-md-7">
	               		<h2>{this.props.pet.name.$t} - id#{this.props.pet.id.$t}</h2>
	               		<Breeds pet={this.props.pet}/>
	               		<p>{this.props.pet.description.$t}</p>
	               	</span>
	               	<span className="col-md-3">
	               		<h4>Contact Info</h4>
						<ul className="list-unstyled">
							{Object.keys(this.props.pet.contact).map(function (key, id) {
							  if(!!this.props.pet.contact[key].$t){
							  	return <li key={id}><strong>{key}: </strong>{this.props.pet.contact[key].$t}</li>
							  }
							}, this)}
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
    	//toggle pet info breakdown
    	if(this.state.showPetInfo) {
    		this.setState({ showPetInfo: false });
    	} else {
        	this.setState({ showPetInfo: true });
        }
    }
    render() {
    	//messing around with toggle classes
		var style = {};
		if (this.state.showPetInfo) {
			style.display = 'none'
		}
        return (
        	<tbody>
				<tr style={style}>
					<td><span>{this.props.pet.id.$t}</span></td>
					<td><span>{this.props.pet.animal.$t}</span></td>
					<td><span>{this.props.pet.name.$t}</span></td>
					<td><span>{this.props.pet.age.$t}</span></td>
					<td><span>{this.props.pet.sex.$t}</span></td>
					<td><span>{this.props.pet.size.$t}</span></td>
					<td><a className="breakdown-toggle glyphicon glyphicon-chevron-down open-chevron" href="javascript:;" onClick={this.petInfoClick.bind(this)}></a></td>
				</tr>
				{/* .bind(this) to pass state!!! */}
				{this.state.showPetInfo ? <PetInfo pet={this.props.pet} petInfoClick={this.petInfoClick.bind(this)}/> : null}
			</tbody>
        )
    }
}

export default Pet;