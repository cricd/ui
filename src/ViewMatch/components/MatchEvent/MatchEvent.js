import React, { Component } from 'react';
import './MatchEvent.scss';

class MatchEvent extends Component {
    /*
    {
    "match": 1,
    "eventType": "delivery",
    "timestamp": "2009-06-21",
    "ball": {
        "battingTeam": {
        "id": 1,
        "name": "Pakistan"
        },
        "fieldingTeam": {
        "id": 5,
        "name": "Sri Lanka"
        },
        "innings": 2,
        "over": 18,
        "ball": 2
    },
    "runs": 4,
    "batsmen": {
        "striker": {
        "id": 37,
        "name": "Shoaib Malik"
        },
        "nonStriker": {
        "id": 30,
        "name": "Shahid Afridi"
        }
    },
    "bowler": {
        "id": 53,
        "name": "SL Malinga"
    }
    }
    */
    render() {
        return (
            <div>{this.props.eventType}</div>
        );
    }
}

export default MatchEvent;
