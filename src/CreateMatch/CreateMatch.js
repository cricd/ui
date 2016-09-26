import React, { Component } from 'react';
import './CreateMatch.scss';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';

const teams = [
]

class CreateMatch extends Component {
    constructor() {
        super()
        fetch("http://localhost:1337/teams").then(
            function (response) {
                return response.json();
            }).then(function (res) {
                for (var i = 0; i < res.length; i++) {
                    teams.push(res[i]["name"])
                }
            });
            this.state = {
                homeTeam: "",
                awayTeam: "",
                matchDate: ""
            }

            this.handleHomeTeam = this.handleHomeTeam.bind(this)
            this.handleAwayTeam = this.handleAwayTeam.bind(this)


    }
    handleHomeTeam(input) {
        this.setState({homeTeam: input})
   }
    handleAwayTeam(input) {
        this.setState({awayTeam: input})
   }

    createMatch(index) {
        console.log(index);
    }

    render() {
        return (
            <div>
                <h2>
                    Create Match
                </h2>
                <h3> Home team </h3>
                <AutoComplete
                    name="homeTeam"
                    hintText="Select the home team"
                    dataSource={teams}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={this.handleHomeTeam}
                    />
                <h3> Away team </h3>
                <AutoComplete
                    name="awayTeam"
                    hintText="Select the away team"
                    dataSource={teams}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={this.handleAwayTeam}
                    />
                <h3> Match date </h3>
                <DatePicker
                    autoOk={true}
                    />
                     <FlatButton 
                     label="Create" 
                     onClick={this.createMatch}
                     />
            </div>
        );
    }
}

export default CreateMatch;
