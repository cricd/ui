import React, { Component } from 'react';
import './CreateMatch.scss';
import TeamSuggest from './components/TeamSuggest';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';

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
                <DatePicker  />
            </div>
        );
    }
}

export default CreateMatch;
