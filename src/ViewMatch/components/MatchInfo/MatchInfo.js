import React, { Component } from 'react';
import './MatchInfo.scss';
import moment from 'moment';

class MatchInfo extends Component {
    /*
    "matchInfo": {
        "homeTeam": {
        "name": "New Zealand",
        "id": 4,
        "createdAt": "2016-09-12T09:10:48.000Z",
        "updatedAt": "2016-09-12T09:10:48.000Z"
        },
        "awayTeam": {
        "name": "Sri Lanka",
        "id": 8,
        "createdAt": "2016-09-12T09:10:48.000Z",
        "updatedAt": "2016-09-12T09:10:48.000Z"
        },
        "startDate": "2009-06-16T00:00:00.000Z",
        "numberOfInnings": 1,
        "limitedOvers": 20,
        "id": 4,
        "createdAt": "2016-09-12T09:10:48.000Z",
        "updatedAt": "2016-09-12T09:10:48.000Z"
    }
    */
    render() {
        var typeOfMatch = "Twenty20";
        var numberOfInnings = this.props.numberOfInnings ? this.props.numberOfInnings : 1;
        var limitedOvers = this.props.limitedOvers ? this.props.limitedOvers : 20;
        var homeTeamName = this.props.homeTeam ? this.props.homeTeam.name : 'New Zealand';
        var awayTeamName = this.props.awayTeam ? this.props.awayTeam.name : 'Australia';
        
        if(numberOfInnings == 2 && !limitedOvers) typeOfMatch = "Test match";
        else if(numberOfInnings == 1 && limitedOvers == 50) typeOfMatch = "50 Over match";
        else if(numberOfInnings == 1 && limitedOvers == 20) typeOfMatch = "Twenty20";
        else if(!limitedOvers) typeOfMatch = numberOfInnings + " innings each side. Unlimited overs";
        else typeOfMatch = numberOfInnings = " innings each side. Restricted to " + limitedOvers + " overs";

        return (
            <div>
                <div>
                    <span>{homeTeamName}</span>
                    <span className="vs">vs</span>
                    <span>{awayTeamName}</span>
                </div>
                <div>{typeOfMatch}</div>
                <div>{moment(this.props.startDate).format("dddd, MMMM Do YYYY")}</div>
            </div>
        );
    }
}

export default MatchInfo;
