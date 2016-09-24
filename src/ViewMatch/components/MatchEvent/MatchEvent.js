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
    getCommentary(e) {
        switch(e.eventType) {
            case "delivery":
                if(e.runs == 0) return 'Dot ball';
                if(e.runs == 1) return '1 run';
                else return e.runs + ' runs';
            case "noBall":
                if(e.runs > 1) return 'No ball and ' + e.runs + ' runs';
                else return 'No ball';
            case "wide":
                if(e.runs > 0) return 'Wide and the batsmen have run ' + e.runs;
                else return 'Wide';
            case "bye":
                return e.runs + ' byes';
            case "legBye":
                return e.runs + ' leg byes';
            case "bowled":
                return e.batsmen.striker.name + ' has been bowled';
            case "timedOut":
                return e.batsman.name + ' was timed out';
            case "handledBall":
                return e.batsmen.striker.name + ' has been dismissed for handled ball';
            case "doubleHit":
                return e.batsmen.striker.name + ' has been dismissed for a double hit';
            case "hitWicket":
                return e.batsmen.striker.name + ' has hit his wickets';
            case "lbw":
                return e.batsmen.striker.name + ' out leg before wicket';
            case "obstruction":
                return e.batsman.name + ' has been dismissed for obstructing a fielder';
            case "runOut":
                return e.batsman.name + ' has been runout attempting to run ' + e.runs;
            case "stumped":
                return e.batsmen.striker.name + ' has been stumped';
            default: return '';
        }
    }

    render() {
        var overAndBall = this.props.ball ? this.props.ball.over + '.' + this.props.ball.ball : '0.0';
        var bowlerToBatsman = (this.props.bowler && this.props.batsmen) ? this.props.bowler.name + ' to ' + this.props.batsmen.striker.name : '';
        var commentary = this.props.eventType ? this.getCommentary(this.props) : '';
        return (
            <div>
                <span className="overAndBall">{overAndBall}</span>
                <span className="bowlerToBatsman">{bowlerToBatsman}</span>
                <span className="commentary">{commentary}</span>
            </div>
        );
    }
}

export default MatchEvent;
