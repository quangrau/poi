import React, { Component } from "react";
import POI from "./POI";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="App__header navbar navbar-light">
          <a className="navbar-brand">
            <span className="fa fa-home" />
          </a>
        </nav>
        <div className="App__content container-fluid">
          <POI />
        </div>
      </div>
    );
  }
}

export default App;
