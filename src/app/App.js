import React, { Component } from 'react';
import NavBar from './Components/NavBar/NavBar.js';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from 'mobx-react-devtools';
import { Provider, observer } from 'mobx-react';
import { action } from 'mobx';
import Snackbar from 'material-ui/Snackbar';
import * as colors from 'material-ui/styles/colors';

import uiStateStore from './Stores/UIStateStore';
import matchStore from './Stores/MatchStore';
import teamStore from './Stores/TeamStore';

@observer class App extends Component {

    constructor() {
        super();
        this.dismissError = this.dismissError.bind(this);
    }
    @action dismissError(reason) { uiStateStore.error = ''; }

    render() {
        return (
            <Provider 
                matchStore={matchStore} 
                uiStateStore={uiStateStore}
                teamStore={teamStore}
            >
                <MuiThemeProvider>
                    <div>
                        <NavBar />
                        <DevTools />
                        <div className="container">
                            {this.props.children}
                        </div>
                        <Snackbar 
                            bodyStyle={{ backgroundColor: colors.redA700 }}
                            message={uiStateStore.error} 
                            open={uiStateStore.errorOpen} 
                            autoHideDuration={5000}
                            onRequestClose={this.dismissError}
                        />
                    </div>
                </MuiThemeProvider>
             </Provider>
        );
    }
}

export default App;
