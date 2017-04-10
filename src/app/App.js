import React, { Component } from 'react';
import NavBar from './Components/NavBar/NavBar.js';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import DevTools from 'mobx-react-devtools';
import { Provider, observer } from 'mobx-react';
import { action } from 'mobx';
import Snackbar from 'material-ui/Snackbar';
import * as colors from 'material-ui/styles/colors';

import uiStateStore from './Stores/UIStateStore';
import matchStore from './Stores/MatchStore';
import teamStore from './Stores/TeamStore';

/* const cricdTheme = getMuiTheme({
    fontFamily: 'Avenir, sans-serif',
    palette: {
       primary1Color: "#3679CE",
       primary2Color: "#5890D9",
       primary3Color: "#82AEE6",
       accent1Color: "#FFFF32",
        accent2Color: "#FFFF59",
    accent3Color: grey500,
    canvasColor: white,
    borderColor: "#cccccc",
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
        textColor: "#000",
        alternativeTextColor: "#FFF",
    },
}); */

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
                teamStore={teamStore} >
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
                            onRequestClose={this.dismissError}
                        />
                    </div>
                </MuiThemeProvider>
             </Provider>
        );
    }
}

export default App;
