import React, { Component } from 'react';
import './CreateMatch.scss';
import DatePicker from 'material-ui/DatePicker';
import { Card, CardTitle, CardHeader } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';
import {red500, grey200} from 'material-ui/styles/colors';

const styles = {
    errorStyle: {
        color: red500,
    },
    buttonStyle: {
        width: '100%',
    }
};


const teams = []

class CreateMatch extends Component {
    constructor(props) {
        super(props)
        fetch("http://localhost:1337/teams")
            .then(function (response) {
                if (!response.ok) {
                    console.log("Failed to get teams: " + response.statusText)
                    return nil
                }
                return response.json();
            }).then(function (res) {
                for (var i = 0; i < res.length; i++) {
                    teams.push(res[i]["name"])
                }
            }).catch(function (error) {
                console.log(error)
            });

        this.state = {
            homeTeam: "",
            awayTeam: "",
            startDate: new Date(),
            matchType: "",
            limitedOvers: 0,
            numberOfInnings: 0,
            notificationOpen: false,
            notificationMessage: "Match created"
        }

        this.handleHomeTeamRequest = this.handleHomeTeamRequest.bind(this)
        this.handleHomeTeamUpdate = this.handleHomeTeamUpdate.bind(this)
        this.handleAwayTeam = this.handleAwayTeam.bind(this)
        this.handleMatchTypeChange = this.handleMatchTypeChange.bind(this)
        this.handleStartDate = this.handleStartDate.bind(this)
        this.createMatch = this.createMatch.bind(this)

    }


    handleHomeTeamUpdate(input) {
        console.log("input: " + input);
    }

    handleHomeTeamRequest(input) {
        console.log(input)
        fetch("http://localhost:1337/teams/?name=".concat(input))
            .then(function (response) {
                if (!response.ok) {
                    console.log("Failed to get teams: " + response.statusText)
                    return nil
                }
                return response.json();
            }).then(function (res) {
                var team = { id: res[0]["id"], name: res[0]["name"] }
                this.setState({ homeTeam: team })
            }.bind(this)
            ).catch(function (error) {
                console.log("Failed to get teams: " + error)
            });
    };

    handleAwayTeam(input) {
        fetch("http://localhost:1337/teams/?name=".concat(input))
            .then(function (response) {
                if (!response.ok) {
                    console.log("Failed to get teams: " + response.statusText)
                    return nil
                }
                return response.json();
            }).then(function (res) {
                var team = { id: res[0]["id"], name: res[0]["name"] }
                this.setState({ awayTeam: team })
            }.bind(this)).catch(function (error) {
                console.log(error)
            });
    };

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
        // TODO: Refactor this to have an "internal state"
        delete payload["matchType"]
        delete payload["notificationOpen"]
        delete payload["notificationMessage"]
        fetch("http://localhost:1337/matches",
            {
                method: "POST",
                body: payload
            })
            .then(function (response) {
                if (!response.ok) {
                    console.log(response)
                    console.log("Failed to create match: " + response.statusText)
                    return nil
                }
                console.log("Created match")
                this.setState({
                    notificationMessage: "Match created",
                    notificationOpen: true
                })
                return response.json();
            }.bind(this))
            .catch(function (data) {
                //TODO: Handle the failure here
                console.log("Failed to create match: " + data)
                this.setState({
                    notificationMessage: "Failed to create match",
                    notificationOpen: true
                })
            }.bind(this))
    }

    render() {
        return (
            <div>
                <Card className="createContainer">
                    <CardTitle
                        title="Create Match"
                        />
                    <h4> Home team </h4>
                    <AutoComplete
                        name="homeTeam"
                        hintText="Select the home team"
                        dataSource={teams}
                        filter={AutoComplete.fuzzyFilter}
                        onNewRequest={this.handleHomeTeamRequest}
                        onUpdateInput={this.handleHomeTeamUpdate}
                        errorText="This field is required."
                        errorStyle={styles.errorStyle}
                        />
                    <h4> Away team </h4>
                    <AutoComplete
                        name="awayTeam"
                        hintText="Select the away team"
                        dataSource={teams}
                        filter={AutoComplete.fuzzyFilter}
                        onNewRequest={this.handleAwayTeam}
                        errorText="This field is required."
                        errorStyle={styles.errorStyle}
                        />
                    <h4> Match date </h4>
                    <DatePicker
                        autoOk={true}
                        onChange={this.handleStartDate}
                        defaultDate={new Date() }
                        />
                    <div>
                        <h4> Match type </h4>
                        <SelectField
                            value={this.state.matchType}
                            onChange={this.handleMatchTypeChange}
                            style={{ marginBottom: 20 }}
                            >
                            <MenuItem value={"t20"} primaryText="T20" />
                            <MenuItem value={"oneDay"} primaryText="One Day" />
                            <MenuItem value={"testMatch"} primaryText="Test Match" />
                        </SelectField>
                    </div>
                    //TODO: Add styles
                    <RaisedButton
                        label="Create"
                        onClick={this.createMatch}
                        disabled={(this.state.awayTeam.length === "") || (this.state.homeTeam === "") }
                        style={styles.buttonStyle}
                        />
                </Card>
                <Snackbar
                    open={this.state.notificationOpen}
                    message={this.state.notificationMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    />
            </div>
        );
    }
}

export default CreateMatch;
