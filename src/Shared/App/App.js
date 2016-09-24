import React, { Component } from 'react';
import { Link } from 'react-router';
import NavBar from '../NavBar/NavBar.js';
import './App.scss';
import 'grommet/grommet.min.css';
class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
