import React, { Component } from 'react';
import Score from './Score'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cricd</h2>
        </div>
        <Score />
      </div>
    );
  }
}

export default App;
