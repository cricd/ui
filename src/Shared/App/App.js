import React, { Component } from 'react';
import { Link } from 'react-router';
import NavBar from '../NavBar/NavBar.js';
import './App.scss';

class App extends Component {
    getChildContext() {
        return {
            rebass: {
            }
        }
    }

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

App.childContextTypes = {
    rebass: React.PropTypes.object
}

export default App;
