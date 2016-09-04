import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';

class App extends Component {
    render() {
        return (
            <div>
                <h2>Cricd</h2>
                <ul>
                    <li><Link to="/matches">Matches</Link></li>
                    <li><Link to="/score">Score</Link></li>
                </ul>
                {this.props.children}
            </div>
    );
  }
}

export default App;
