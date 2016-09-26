import React, { Component } from 'react';
import { Link } from 'react-router';
import NavBar from '../NavBar/NavBar.js';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {

    render() {
        injectTapEventPlugin();
        return (
            <MuiThemeProvider>
                <div>
                    <NavBar />
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
