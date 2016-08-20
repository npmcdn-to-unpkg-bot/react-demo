import React from 'react';
import {render} from 'react-dom';
import PetsList from './PetsList.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            data: [] 
        }
    }
    loadPetsFromServer(event) {
        //if function called from child, lets add to array
        if(this.state.loaded){
             this.setState({
                add: true
             });
        }
        //build out api from defined props
        var requestParams = {};
        requestParams.key = this.props.unique_key;
        requestParams.location = this.props.location;
        requestParams.format = this.props.format;
        var esc = encodeURIComponent,
            query = Object.keys(requestParams)
                .map(k => esc(k) + '=' + esc(requestParams[k]))
                .join('&'),
            url = this.props.uri + query;

        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: (data) => {
                if(this.state.add){
                    this.setState((state) => ({ 
                        data: state.data.concat(data.petfinder.pets)
                    }))
                    
                } else {
                    this.setState({
                        data: data.petfinder.pets,
                        loaded: true
                    });
                }
                console.log("this.state.data:");
                console.log(this.state.data);
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
        //load page after stat has value
        if(this.state.loaded){
            return (
                <PetsList pets={this.state.data} loadPetsFromServer={this.loadPetsFromServer}/>
            ) 
        }
        //spinner until state has value
        return (
            <div className="spinner">
                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            </div>
        )
        
    }
}


render(
    <App uri="http://api.petfinder.com/pet.find?" unique_key="6b0b0e4ca007882e03ce7d5e3ad6bf2b" location="60192" format="json"
    pollInterval={2000}/>, document.getElementById('app')
);