import React from 'react';
import SwapiService from '../services/swapiService';
import {getRandomIntInclusive, checkOnUnknown} from '../services/serviceHelper';
import Loading from './Loading';
import ErrorComponent from './ErrorComponent';

class RandomPlanet extends React.Component{
    swapiService = new SwapiService();
    _setIntervalId = null;

    state = {
        planet: {},
        loading: true,
        error: false,
    }

    componentDidMount(){
        this.updatePlanet();
        this._setIntervalId = setInterval(this.updatePlanet, 10000);
    }

    componentWillUnmount(){
        clearInterval(this._setIntervalId);
    }

    onLoadedPlanet = (planet) => {
        this.setState({
            planet,
            loading: false,
        });
    }

    onSetError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    updatePlanet = () => {
        const id = getRandomIntInclusive(1, 25);
        this.swapiService.getPlanetById(id)
            .then(this.onLoadedPlanet);
    }

    render(){
        const {planet: {id, name, population, rotationPeriod, diameter}, loading, error } = this.state;

        const errorIndicator = error ? <ErrorComponent/> : null;

        const loadIndicator = loading ? <Loading/> : null;

        const element = <div className = "RandomPlanet block">
        <div className = "RandomPlanet__img-wrapper block__img-wrapper">
            <img className = "RandomPlanet__img" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="" />
        </div>
        <div className = "RandomPlanet__description block__descr">
            <div className = "RandomPlanet__name block__name">
                {name}
            </div>
            <div className = "RandomPlanet__description-list block__descr-list">
                <div className = "RandomPlanet__description-list-item block__descr-list-item">
                    <span>Population: </span>
                    <span>{checkOnUnknown(population)}</span>
                </div>
                <div className = "RandomPlanet__description-list-item block__descr-list-item">
                    <span>Rotation Period: </span>
                    <span>{checkOnUnknown(rotationPeriod)}</span>
                </div>
                <div className = "RandomPlanet__description-list-item block__descr-list-item">
                    <span>Diameter: </span>
                    <span>{diameter}</span>
                </div>
            </div>
        </div>
    </div>

        const content = !(error || loading) ? element : null;

        return (
            <div className = "wrapper">
                {errorIndicator}
                {loadIndicator}
                {content}
            </div>
        )
    }
}   

export default RandomPlanet;