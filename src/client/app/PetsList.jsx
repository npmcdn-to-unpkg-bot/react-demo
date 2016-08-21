import React from 'react';
import Pet from './Pet.jsx';

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

    updateSearch(event) {
    	//set state of search, used for filteredPet 
        this.setState({
        	search: event.target.value.substr(0, 20)
        });
    }

    addPet(event) {
		event.preventDefault();
		//read all the ref attrs
		var min=10000000, max=39999999;
		let id = Math.floor(Math.random() * (max - min + 1) + min).toString();
		let animal = this.refs.animal.value;
		let name = this.refs.name.value;
		let age = this.refs.age.value;
		let sex = this.refs.sex.value;
		let size = this.refs.size.value;
		let breed = this.refs.breed.value;
		let description = this.refs.description.value;
		let contactname = this.refs.contactname.value;
        let contactemail = this.refs.contactemail.value;
        let contactcity = this.refs.contactcity.value;
        let contactzip = this.refs.contactzip.value;
		let image = "https://i.ytimg.com/vi/icqDxNab3Do/maxresdefault.jpg";
		console.log("AddPet - Info: " + id + " " + animal + " " +
			name + " " + age + " " + sex + " " + size + " " + breed);
		console.log("Contact - Info: " + id + " " + contactname + " " +
			contactemail + " " + contactcity + " " + contactzip);
		//proper array for combining
		var newPetArray = {
			"pet":[{
				"id":{"$t":id},
	            "animal":{"$t":animal},
				"name":{"$t":name},
	            "age":{"$t":age},
	            "sex":{"$t":sex},
	            "size":{"$t":size},
	            "breeds":{  
	               "breed":{"$t":breed},
	            },
	            "contact":{  
               		"name":{"$t":contactname},
               		"email":{"$t":contactemail},
               		"city":{"$t":contactcity},
               		"zip":{"$t":contactzip}
               	},
               	"media":{  
               		"photos":{  
                  		"photo":[{  
	                        "@size":"pnt",
	                        "$t":"http://i.ytimg.com/vi/icqDxNab3Do/maxresdefault-2341241223422.jpg",
	                        "@id":"1"
	                    }]
	                }
	            },
	            "description":{"$t":description}
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

        //resey all the ref attrs
        this.refs.animal.value = "";
        this.refs.name.value = "";
        this.refs.age.value = "";
        this.refs.sex.value = "";
        this.refs.size.value = "";
        this.refs.breed.value = "";
        this.refs.description.value = "";

        this.refs.contactname.value = "";
        this.refs.contactemail.value = "";
        this.refs.contactcity.value = "";
        this.refs.contactzip.value = "";

        //scroll up to show new entry
        $('html, body').animate({
			scrollTop: $('#app').offset().top
        }, 500);
        //console.log(this.state);
        //this.setState({ showPetInfo: true });
	}
	autoFillForm(){
		this.refs.animal.value = "Cat";
        this.refs.name.value = "Tom Cat";
        this.refs.age.value = "Adult";
        this.refs.sex.value = "M";
        this.refs.size.value = "L";
        this.refs.breed.value = "Blue And White Bicolor Domestic Shorthair Cat";
        this.refs.description.value = "His only notable vocal sounds outside of this are his various screams whenever he is subject to pain or panic. He is continuously after Jerry Mouse, for whom he sets traps, many of which backfire and cause damage to him rather than poor Jerry.";
        this.refs.contactname.value = "Jerry";
        this.refs.contactemail.value = "jerry@hannabarbera.com";
        this.refs.contactcity.value = "New York";
        this.refs.contactzip.value = "10001";
	}

    render() {
    	//map to pet.id array
        let filteredPets = this.state.pets.pet.filter(
        	//indiv pet - characters of state
            (pet) => {
                return pet.id.$t.indexOf(this.state.search) !== -1;
            }
        );
        //loop thru by pet id
    	console.log("Current State: ");
    	console.log(this.state);
        return (
            <div className="row">
            	{/* Pet Finder Header */}
           		<div className="page-header">
                    <div className="pet-finder-logo"></div>
                    <div className="col-md-4 search form-group form-group-lg">
                    	{/* onchange state.search */}
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
								<td><strong></strong></td>
							</tr>
						</thead>
	                    {filteredPets.map((pet) => {
	                        return <Pet pet={pet} key={pet.id.$t} />
	                    })}
	                </table>
					<button type="button" onClick={this.props.loadPetsFromServer} className="btn my-btn btn-lg btn-primary">Load More</button>
            	</div>


            	{/* Add Pet Form */}
                <div className="col-md-10 page-header">
                	<br /><br /><br /><br />
		            <h1>Pet Entry</h1>
		        </div>
		        <div className="col-md-10 pet-entry-form">
					<form onSubmit={this.addPet.bind(this)}>
						<div className="col-md-10 page-header">
				            <h4>Contact Information</h4>
				        </div>
						{/* Contact Name */}
						<div className="col-md-5">
							<label htmlFor="contactName">Full Name</label>
							<input id="contactName" min="2" max="25" name="contactname" pattern="^[a-zA-Z ]*$" type="text" ref="contactname" className="form-control" required></input>
							<br />
						</div>
						{/* Contact Email */}
						<div className="col-md-5">
							<label htmlFor="contactEmail">Email</label>
							<input id="contactEmail" min="2" max="45" name="contactemail" type="email" ref="contactemail" className="form-control" required></input>
							<br />
						</div>
						{/* Contact City */}
						<div className="col-md-8">
							<label htmlFor="contactCity">City</label>
							<input id="contactCity" min="2" max="45" name="contactcity" type="text" ref="contactcity" className="form-control" required></input>
							<br />
						</div>
						{/* Contact Zip */}
						<div className="col-md-2">
							<label htmlFor="contactZip">Zip Code</label>
							<input id="contactZip" name="contactzip" type="number" ref="contactzip" className="form-control" required></input>
							<br />
						</div>

						<div className="col-md-10 page-header">
				            <h4>Pet Information</h4>
				        </div>

						{/* Animal Name */}
						<div className="col-md-7">
							<label htmlFor="animalName">Animal Name </label>
							<input id="animalName" min="2" max="25" name="name" type="text" ref="name" className="form-control" required></input>
							<br />
						</div>

						{/* Animal Breed */}
						<div className="col-md-7">
							<label htmlFor="animalBreed">Animal Breed</label>
							<input id="animalBreed" min="2" max="25" name="breed" pattern="^[a-zA-Z ]*$" type="text" ref="breed" className="form-control" required></input>
							<br />
						</div>

						{/* Animal Breed */}
						<div className="col-md-7">
							<label htmlFor="animalDesc">Description</label>
							<textarea id="animalDesc" min="1" max="250" name="description"type="text" ref="description" className="form-control" required />
							<br />
						</div>

						<div className="col-md-10 media">
							{/* Animal Type */}
							<div className="pull-left">
								<label htmlFor="animal">Animal </label>
								<select className="form-control" id="animal" ref="animal" required>
									<option value=""></option>
									<option value="Dog">Dog</option>
									<option value="Cat">Cat</option>
								</select>
								<br />
							</div>
							{/* Animal Age */}
							<div className="pull-left">
								<label htmlFor="animalAge">Age </label>
								<select className="form-control" id="animalAge" ref="age" required>
									<option value=""></option>
									<option value="Baby">Baby</option>
									<option value="Young">Young</option>
									<option value="Adult">Adult</option>
									<option value="Senoir">Senior</option>
								</select>
								<br />
							</div>

							{/* Animal Gender */}
							<div className="pull-left">
								<label htmlFor="animalSex">Sex</label>
								<select className="form-control" id="animalSex" ref="sex" required>
									<option value=""></option>
									<option value="M">Male</option>
									<option value="F">Female</option>
								</select>
								<br />
							</div>

							{/* Animal Size */}
							<div className="pull-left">
								<label htmlFor="animalSize">Size </label>
								<select className="form-control" id="animalSize" ref="size" required>
									<option value=""></option>
									<option value="S">Small</option>
									<option value="M">Medium</option>
									<option value="L">Large</option>
								</select>
							</div>
						</div>
						<div className="col-md-10 media">
							<br />
							<span className="pull-left">
								<button type="submit" className="btn my-btn btn-lg btn-primary">Add New Pet</button>
							</span>
							<span className="pull-left">
							<button type="button" className="btn btn-lg btn-default" onClick={this.autoFillForm.bind(this)}>AutoFill</button>
							</span>
						</div>
					</form>
		        </div>
            </div>
        )
    }
}

export default PetsList;