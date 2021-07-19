import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import SwapiService from '../src/services/swapiService';

new SwapiService().getAllPeople().then(console.log);

ReactDOM.render(
  <React.StrictMode><App/></React.StrictMode>, 
  document.getElementById('root')
);

