import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar.js';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    render() {
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
