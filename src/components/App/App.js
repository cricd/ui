import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';
import NavBar from '../NavBar/NavBar.js';


class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div>
                    <ul>
                        <li><Link to="/matches">View Match</Link></li>
                        <li><Link to="/score">Score Match</Link></li>
                    </ul>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
