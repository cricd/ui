import React, { Component } from 'react';
import { Link } from 'react-router';
import NavBar from '../NavBar/NavBar.js';
import './App.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {
    getChildContext() {
        return {
            rebass: {
            }
        }
    }

    render() {
        injectTapEventPlugin();
        return (
            <div>
                <NavBar />
                <div className="container">
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
