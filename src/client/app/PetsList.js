import React from 'react';
import Pet from './Pet';
import PetHeader from './PetHeader';

class PetsList extends React.Component {
    constructor(props) {
    	//prop required or undef
        super(props);
        //carry prop from parent into current state
    	this.state = {
            search: '',
            pets: this.props.pets
    	}
        
    }

    addPet(event) {
		event.preventDefault();
		var min=10000000, max=39999999;
		let id = Math.floor(Math.random() * (max - min + 1) + min).toString();
		let animal = this.refs.animal.value;
		let name = this.refs.name.value;
		let age = this.refs.age.value;
		let sex = this.refs.sex.value;
		let size = this.refs.size.value;
		
		console.log("AddPet - Info: " + id + " " + animal + " " +
			name + " " + age + " " + sex + " " + size )
		
		var newPetArray = {
			"pet":[{
				"id":{"$t":id},
	            "animal":{"$t":animal},
				"name":{"$t":name},
	            "age":{"$t":age},
	            "sex":{"$t":sex},
	            "size":{"$t":size}
			}]
		}
		//combine old data with new entry
		var newPets = [];
		newPets.push.apply(newPets, newPetArray.pet);
		newPets.push.apply(newPets, this.state.pets.pet);
		//set new array to state.pet
		this.setState({
			pets: Object.assign({pet: newPets})
        });
        this.refs.animal.value = "";
        this.refs.name.value = "";
        this.refs.age.value = "";
        this.refs.sex.value = "";
        this.refs.size.value = "";
	}

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)});
    }   

    render() {
    	//loop thru by pet id
    	console.log("Current State: ");
    	console.log(this.state);
        let filteredPets = this.state.pets.pet.filter(
            (pet) => {
                return pet.id.$t.indexOf(this.state.search) !== -1;
            }
        );
        return (
            <div className="row">
            	{/* Pet Finder Header */}
           		<div className="page-header">
                    <div className="pet-finder-logo"></div>
                    <div className="col-md-4 search">
                    	<input placeholder="Search by Pet #" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} className="form-control"/>
               		</div>
                </div>

            	{/* Filtered Pets Table */}
                <div className="pet-table">
	                <table className="custom-tbody table table-striped">
						<thead>
							<tr>
								<td><strong>Pet #</strong></td>
								<td><strong>Animal</strong></td>
								<td><strong>Name</strong></td>
								<td><strong>Age</strong></td>
								<td><strong>Sex</strong></td>
								<td><strong>Size</strong></td>
							</tr>
						</thead>
	                    {filteredPets.map((pet) => {
	                        return <Pet pet={pet} key={pet.id.$t} />
	                    })}
	                </table>
                </div>


            	{/* Add Pet Form */}
                <div className="col-md-10 page-header">
		            <h1>Pet Entry</h1>
		        </div>
		        <div className="col-md-10">
					<form onSubmit={this.addPet.bind(this)}>

						{/* Animal Type */}
						<div className="col-md-2">
							<label htmlFor="animal">Animal </label>
							<select className="form-control" id="animal" ref="animal" required>
								<option value=""></option>
								<option value="Dog">Dog</option>
								<option value="Cat">Cat</option>
							</select>
						</div>

						{/* Animal Name */}
						<div className="col-md-3">
							<label htmlFor="animalName">Name </label>
							<input id="animalName" min="2" max="25" name="age" pattern="^[a-zA-Z ]*$" type="text" ref="name" className="form-control" required></input>
						</div>

						{/* Animal Age */}
						<div className="col-md-2">
							<label htmlFor="animalAge">Age </label>
							<select className="form-control" id="animalAge" ref="age" required>
								<option value=""></option>
								<option value="Baby">Baby</option>
								<option value="Young">Young</option>
								<option value="Adult">Adult</option>
								<option value="Senoir">Senior</option>
							</select>
						</div>

						{/* Animal Gender */}
						<div className="col-md-2">
							<label htmlFor="animalSex">Sex</label>
							<select className="form-control" id="animalSex" ref="sex" required>
								<option value=""></option>
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
						</div>

						{/* Animal Size */}
						<div className="col-md-2">
							<label htmlFor="animalSize">Size </label>
							<select className="form-control" id="animalSize" ref="size" required>
								<option value=""></option>
								<option value="S">Small</option>
								<option value="M">Medium</option>
								<option value="L">Large</option>
							</select>
						</div>
						<div className="col-md-10">
						<br />
							<button type="submit" className="btn my-btn btn-primary">Add New Pet</button>
						</div>
					</form>
		        </div>
            </div>
        )
    }
}

export default PetsList;