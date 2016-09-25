import React, { Component } from 'react';
import { Divider, Heading } from 'rebass';
import './CreateMatch.scss';
import TeamSuggest from './components/TeamSuggest'
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CreateMatch extends Component {


    render() {
        return (
            <div>
                <h2>
                    Create Match
                </h2>
                <h3> Home team </h3>
                <TeamSuggest />
                <h3> Away team </h3>
                <TeamSuggest />
                <h3> Match date </h3>
                <MuiThemeProvider>
                    <DatePicker  />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default CreateMatch;
