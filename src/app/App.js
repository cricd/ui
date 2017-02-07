import React, { Component } from 'react';
import NavBar from './Components/NavBar/NavBar.js';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';

import uiStateStore from './Stores/UIStateStore';
import matchStore from './Stores/MatchStore';


class App extends Component {
    render() {
        return (
            <Provider matchStore={matchStore} uiStateStore={uiStateStore}>
                <MuiThemeProvider>
                    <div>
                        <NavBar />
                        <DevTools />
                        <div className="container">
                            {this.props.children}
                        </div>
                    </div>
                </MuiThemeProvider>
             </Provider>
        );
    }
}

export default App;
