import React, { Component } from 'react';
import './CreateMatch.scss';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {red500} from 'material-ui/styles/colors';

const styles = {
    errorStyle: {
        color: red500,
    }
};


const teams = []

class CreateMatch extends Component {
    constructor(props) {
        super(props)
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
            startDate: new Date(),
            matchType: "",
            limitedOvers: 0,
            numberOfInnings: 0
        }

        this.handleHomeTeam = this.handleHomeTeam.bind(this)
        this.handleAwayTeam = this.handleAwayTeam.bind(this)
        this.handleMatchTypeChange = this.handleMatchTypeChange.bind(this)
        this.handleStartDate = this.handleStartDate.bind(this)
        this.createMatch = this.createMatch.bind(this)

    }

    handleHomeTeam(input) {
        fetch("http://localhost:1337/teams/?name=".concat(input)).then(
            function (response) {
                return response.json();
            }).then(function (res) {
                var team = {id: res[0]["id"], name: res[0]["name"]}
                console.log(team);
                this.setState({ homeTeam: team })
            }.bind(this))
    };

    handleAwayTeam(input) {
        fetch("http://localhost:1337/teams/?name=".concat(input)).then(
            function (response) {
                return response.json();
            }).then(function (res) {
                var team = {id: res[0]["id"], name: res[0]["name"]}
                console.log(team);
                this.setState({ awayTeam: team })
            }.bind(this))
   }

    handleMatchTypeChange(event, index, value) {
        switch (value) {
            case "t20":
                this.setState({
                    limitedOvers: 20,
                    numberOfInnings: 1,
                    matchType: value
                })
                break;
            case "oneDay":
                this.setState({
                    limitedOvers: 50,
                    numberOfInnings: 1,
                    matchType: value
                })
                break;
            case "testMatch":
                this.setState({
                    limitedOvers: 0,
                    numberOfInnings: 2,
                    matchType: value
                })
                break;
        }
    }
    handleStartDate(event, date) {
        this.setState({ startDate: date })
    }


    createMatch(index) {
        var payload = JSON.stringify(this.state);
        delete payload["matchType"]
        console.log(payload)
        fetch("http://localhost:1337/matches",
            {
                method: "POST",
                body: payload
            })
            .then(function (res) { return res.json(); })
            .then(function (data) { 
            //TODO: Handle the failure here
                console.log(JSON.stringify(data)) 
            })
    }

    render() {
        return (
            <div>
                <Paper>
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
                        errorText="This field is required."
                        errorStyle={styles.errorStyle}
                        />
                    <h3> Away team </h3>
                    <AutoComplete
                        name="awayTeam"
                        hintText="Select the away team"
                        dataSource={teams}
                        filter={AutoComplete.fuzzyFilter}
                        onNewRequest={this.handleAwayTeam}
                        errorText="This field is required."
                        errorStyle={styles.errorStyle}
                        />
                    <h3> Match date </h3>
                    <DatePicker
                        autoOk={true}
                        onChange={this.handleStartDate}
                        defaultDate={new Date() }
                        />
                    <div>
                        <h3> Match type </h3>
                        <SelectField value={this.state.matchType} onChange={this.handleMatchTypeChange}>
                            <MenuItem value={"t20"} primaryText="T20" />
                            <MenuItem value={"oneDay"} primaryText="One Day" />
                            <MenuItem value={"testMatch"} primaryText="Test Match" />
                        </SelectField>
                    </div>
                    <RaisedButton
                        label="Create"
                        onClick={this.createMatch}
                        disabled={(this.state.awayTeam.length === "") || (this.state.homeTeam === "") }
                        />
                </Paper>
            </div>
        );
    }
}

export default CreateMatch;
