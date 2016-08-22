import React from 'react';
import {render} from 'react-dom';
import PetsList from './PetsList.jsx';

//App - Main Parent - Load Data / Build pets
class App extends React.Component {
    constructor() {
        super();
        //set initals states
        this.state = {
            loaded: false,
            data: [] 
        }
    }
    
    loadPetsFromServer(event) {
        //build out api from defined props
        var requestParams = {};
        requestParams.key = this.props.unique_key;
        //random zip code for fun, && dup keys are scary
        var randomZips = ["60192","90210","10001","73301","60067", "97001", "32003"];
        requestParams.location = randomZips[Math.floor(Math.random() * randomZips.length)];
        requestParams.format = this.props.format;
        //api cleanup
        var esc = encodeURIComponent,
            query = Object.keys(requestParams).map(k => esc(k) + '=' + esc(requestParams[k])).join('&'),
            url = this.props.uri + query;

        //if function called from child, lets add to array
        if(this.state.loaded){
             this.setState({
                add: true,
                loaded: false
             });
        }
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: (data) => {
                if(this.state.add){
                    var newPets = [];
                    newPets.push.apply(newPets, this.state.data.pet);
                    newPets.push.apply(newPets, data.petfinder.pets.pet);
                    //set new array to state.pet (if data)
                    this.setState({
                        data: Object.assign({pet: newPets}),
                        loaded: true
                    });     
                } else {
                    //set data for first load
                    this.setState({
                        data: data.petfinder.pets,
                        loaded: true
                    });
                }
                console.log("this.state.data:");
                console.log(this.state.data);
                //TODO - more on (listener instead?) -> this.forceUpdate();
            },
                error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    componentDidMount() {
        this.loadPetsFromServer();
        //not sure about interval here, but in every doc
        //setInterval(this.loadPetsFromServer, this.props.pollInterval);
    }
    render(){
        console.log("this.state.loaded: " + this.state.loaded);
        //load page after state has value
        if(this.state.loaded){
            return (
                <PetsList pets={this.state.data} loadPetsFromServer={this.loadPetsFromServer.bind(this)}/>
            ) 
        }
        //spinner until state has value
        return (
            <div className="row">
                {/* TEMP HEADER */}
                <div className="page-header">
                    <div className="pet-finder-logo"></div>
                </div>
                <div className="spinner">
                    <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
                </div>
            </div>
        )
        
    }
}


render(
    <App uri="http://api.petfinder.com/pet.find?" unique_key="6b0b0e4ca007882e03ce7d5e3ad6bf2b" format="json"
    pollInterval={2000}/>, document.getElementById('app')
);