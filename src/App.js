import React, { Component } from 'react';
import Score from './Score'
import logo from './logo.svg';
import './App.css';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      match: getParameterByName("match")
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cricd</h2>
        </div>
        <Score 
          match={this.state.match}
          />
      </div>
    );
  }
}

export default App;
