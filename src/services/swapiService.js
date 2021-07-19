class SwapiService { // сервис отправляющие данные на сервер
    _apiBase = "https://swapi.dev/api";
    _imageBase = "https://starwars-visualguide.com/assets/img/";
  
    _getResource = async (url) => { // принимает url и возвращает json
      const responce = await fetch(`${this._apiBase}${url}`);
      if (!responce.ok){
        throw new Error(`Could not fethc ${url}`) + `, received ${responce.status}`
      }
  
      return await responce.json();
    }
  
    getAllPeople = async () => {
      const responce = await this._getResource('/people/');
      const arr = responce.results;
      return arr.map(item => {
        return this._transformPerson(item);
      })
    }
  
    getAllPlanets = async () => {
      // тут применяем await потому что this._getResource не выполнится срвзу, так как в этом методе есть awaitЫ!!!
      const responce = await this._getResource('/planets/'); 
      const arr = responce.results;
      return arr.map(item => {
        return this._transformPlanet(item);
      })
    }
  
    getAllStarships = async () => {
      const responce = await this._getResource('/starships/');
      const arr = responce.results;
      return arr.map(item => {
        return this._transformStarship(item);
      })
    }
  
    getPersonById = async (id) => {
      const responce = await this._getResource(`/people/${id}`);
      // return this._transformPerson(responce);
      return responce;
    }
  
    getPlanetById = async (id) => {
      const responce = await this._getResource(`/planets/${id}`);
      return this._transformPlanet(responce);
    }
  
    getStarshipById = async (id) => {
      const responce = await this._getResource(`/starships/${id}`);
      return this._transformStarship(responce);
    }

    getImageUrl = (id, type) => {
      return `${this._imageBase}${type}/${id}.jpg`
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        const id = item.url.match(idRegExp)[1];
        return id;
    }

    _transformPlanet = (planet) => {
        return {
          id: this._extractId(planet),
          url: planet.url,
          name: planet.name,
          population: planet.population,
          rotationPeriod: planet.rotation_period,
          diameter: planet.diameter
        }
    }

    _transformPerson = (person) => {
      return {
        id: this._extractId(person),
        url: person.url,
        name: person.name,
        gender: person.gender,
        height: person.height,
        mass: person.mass,
      }
    }

    _transformStarship = (starship) => {
      return {
        id: this._extractId(starship),
        url: starship.url,
        name: starship.name,
        maxSpeed: starship.max_atmosphering_speed,
        manufacturer: starship.manufacturer,
        class: starship.starship_class,
      }
    }
  }

  export default SwapiService;