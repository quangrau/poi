import React, { Component } from 'react';
import POIFormatter from './POIFormatter'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">POI</h1>
        </header>
        <div className="App-intro">
          <POIFormatter />
        </div>
      </div>
    );
  }
}

export default App;
