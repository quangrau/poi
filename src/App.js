import React, { Component } from "react";
import POI from "./POI";
import AWS from 'aws-sdk'
import "./App.css";

const S3 = new AWS.S3()

console.log(S3)

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
