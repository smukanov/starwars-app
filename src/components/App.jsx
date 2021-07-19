import React from 'react';
import Header from './Header/Header';
import './App.css';
import RandomPlanet from './RandomPlanet';
import StarInfo from './StarInfo/StarInfo';
import SwapiService from '../services/swapiService';
import Record from './StarInfo/Record';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends React.Component{

    swapiService = new SwapiService();

    state = {
        selectedPerson: null,
        selectedPlanet: null,
        selectedStarship: null,
    }

    onSelectItem = (id, type) => {
        switch(type){
            case `https://swapi.dev/api/people/${id}/`:
                this.setState({
                    selectedPerson: id,
                })
                break;
            case `https://swapi.dev/api/planets/${id}/`:
                this.setState({
                    selectedPlanet: id,
                })
                break;
            case `https://swapi.dev/api/starships/${id}/`:
                this.setState({
                    selectedStarship: id,
                })
                break;
            default:
                break;
        }
    }

    render(){
        const {selectedPerson, selectedPlanet, selectedStarship} = this.state;
        const {swapiService} = this;
        return (
            <BrowserRouter>
                <div className = "App">
                <div className="container">
                    <Header/>

                    <RandomPlanet/>

                    <Route path = "/people">
                        <StarInfo // люди
                            getData = {swapiService.getAllPeople} 
                            renderItem = {item => item.name}
                            selectItem = {this.onSelectItem} 
                            selectedItem = {selectedPerson}
                            getItemDetail = {swapiService.getPersonById}
                            getImage = {swapiService.getImageUrl}
                            type = {"characters"}>
                                <Record field = "gender" label = "Gender"/>
                                <Record field = "height" label = "Height"/>
                                <Record field = "mass" label = "Mass"/>
                        </StarInfo>
                    </Route>

                    <Route path = "/planets"> 
                    <StarInfo // планеты
                        getData = {swapiService.getAllPlanets}
                        renderItem = {item => {
                            return (
                                <div>
                                    <span>{item.name}. </span> <span>Diameter: {item.diameter}</span>
                                </div>
                            )
                        }}
                        selectItem = {this.onSelectItem}
                        selectedItem = {selectedPlanet}
                        getItemDetail = {swapiService.getPlanetById}
                        getImage = {swapiService.getImageUrl}
                        type = {"planets"}>
                            <Record field = "population" label = "Population"/>
                            <Record field = "rotationPeriod" label = "Rotation Perion"/>
                            <Record field = "diameter" label = "Diameter"/>
                    </StarInfo>
                    </Route>

                    <Route path = "/starships">
                    <StarInfo // корабли
                        getData = {swapiService.getAllStarships}
                        renderItem = {item => {
                            return (
                                <div>
                                    <span>{item.name}. </span>
                                    <span>Class: {item.class}</span>
                                </div>
                            )
                        }}
                        selectItem = {this.onSelectItem}
                        selectedItem = {selectedStarship}
                        getItemDetail = {swapiService.getStarshipById}
                        getImage = {swapiService.getImageUrl}
                        type = {"starships"}>
                            <Record field = "class" label = "Class"/>
                            <Record field = "maxSpeed" label = "Maximal Speed"/>
                            <Record field = "manufacturer" label = "Manufacturer"/>
                    </StarInfo>
                    </Route>

                </div>
            </div>
            </BrowserRouter>
        )
    }
}

export default App;