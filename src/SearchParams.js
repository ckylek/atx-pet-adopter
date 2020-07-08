import React from "react";
import petfinderClient, { ANIMALS } from "petfinder-client";

class Search extends React.Component {
    state = {
        location: "Seattle, WA",
        animal: "",
        breed: ""
    };

    handleLocationChange = event => {
        this.setState({
            location: event.target.value
        });
    };

    handleAnimalChange = event => {
        this.setState(
            {
            animal: event.target.value
            }
            this.getBreeds
        );
    };

    handleBreedChange = event => {
        this.setState({
            breed: event.target.value
        });
    };

    getBreeds() {
        if (this.state.animal) {
            petfinder.breed
                .list({ animal: this.state.animal })
                .then(data => {
                    if(
                        data.petfinder &&
                        data.petfinder.breeds &&
                        Array.isArray(data.petfinder.breeds.breed)
                    ) {
                        this.setState({
                            breeds: data.petfinder.breeds.breed
                        });
                    } else {
                        this.setState({ breeds: [] });
                    }
                })
                .catch(console.error);
        } else {
            this.setState({
                breeds: []
            });
        }
    }

    render() {
        return (
            <div className="search-params">
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        value={this.state.location}
                        placeholder="Location"   
                        onChange={this.handleLocationChange} 
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={this.state.animal}
                        onChange={this.handleAnimalChange}
                        onBlur={this.handleAnimalChange}
                    >
                        <option />
                        {ANIMALS.map(animal => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                        </select>
                </label>;
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!this.state.breeds.length}
                        id="breed"
                        value={this.state.breed}
                        onChange={this.handleBreedChange}
                        onBlur={this.handleBreedChange}
                    >
                        <option />
                        {this.state.breeds.map(breed => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </div>
        );
    }
}

export default Search