import React, { Component } from 'react';
import './MatchEvent.scss';
import ordinal from 'ordinal-number-suffix';
import { Flex } from 'reflexbox';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { describeEvent } from '../../../Shared/Helpers/describeEvent.js';

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
        var overAndBall = this.props.ball ? this.props.ball.over + '.' + this.props.ball.ball : '0.0';
        var bowlerToBatsman = (this.props.bowler && this.props.batsmen) ? this.props.bowler.name + ' to ' + this.props.batsmen.striker.name : '';
        var commentary = this.props.eventType ? describeEvent(this.props) : '';
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
