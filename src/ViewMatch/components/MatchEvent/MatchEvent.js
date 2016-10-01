import React, { Component } from 'react';
import './MatchEvent.scss';
import ordinal from 'ordinal-number-suffix';
import { Flex } from 'reflexbox';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
                if(e.runs == 1) return '1 run to ' + e.batsmen.striker.name;
                else return e.runs + ' runs to ' + e.batsmen.striker.name;
            case "noBall":
                if(e.runs == 1) return 'No ball and ' + e.runs + ' run';
                if(e.runs > 1) return 'No ball and ' + e.runs + ' runs';
                else return 'No ball';
            case "wide":
                if(e.runs > 0) return 'Wide and the batsmen have run ' + e.runs;
                else return 'Wide';
            case "bye":
                if(e.runs == 1) return '1 bye';
                return e.runs + ' byes';
            case "legBye":
                if(e.runs == 1) return '1 leg bye';
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
            case "caught":
                if(e.fielder) return e.batsmen.striker.name + ' has been caught by ' + e.fielder.name;
                else return e.batsmen.striker.name + ' has been caught out';
            case "runOut":
                if(e.fielder) return e.batsman.name + ' has been run out by ' + e.fielder.name + ' attempting to run the ' + ordinal(e.runs + 1);
                else return e.batsman.name + ' has been run out attempting to run the ' + ordinal(e.runs + 1);
            case "stumped":
                if(e.fielder) return e.batsmen.striker.name + ' has been stumped by ' + e.fielder.name;
                else return e.batsmen.striker.name + ' has been stumped';
            default: return '';
        }
    }

    render() {
        var overAndBall = this.props.ball ? this.props.ball.over + '.' + this.props.ball.ball : '0.0';
        var bowlerToBatsman = (this.props.bowler && this.props.batsmen) ? this.props.bowler.name + ' to ' + this.props.batsmen.striker.name : '';
        var commentary = this.props.eventType ? this.getCommentary(this.props) : '';
        var innings = this.props.ball ? ordinal(this.props.ball.innings) + ' innings' : '';
        return (
            <div>
                <li className="cricd-matchEvent">
                    <Flex align="baseline">
                        <span className="cricd-matchEvent-overAndBall">{overAndBall}</span>
                        <span className="cricd-matchEvent-bowlerToBatsman">{bowlerToBatsman}</span>
                        <span className="cricd-matchEvent-commentary">{commentary}</span>
                        <Flex flexColumn>
                            <span className="cricd-matchEvent-innings">{innings}</span>
                        </Flex>
                    </Flex>
                </li>
                <Divider />
            </div>
        );
    }
}

export default MatchEvent;
