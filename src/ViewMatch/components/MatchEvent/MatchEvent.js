import React from 'react';
import './MatchEvent.scss';
import ordinal from 'ordinal-number-suffix';
import { Flex } from 'reflexbox';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { describeEvent } from '../../../Shared/Helpers/describeEvent.js';

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

function MatchEvent(props) {
    return (
        <div>
            <li className="cricd-matchEvent">
                <Flex align="baseline">
                    <span className="cricd-matchEvent-overAndBall">{props.ball.over}.{props.ball.ball}</span>
                    <span className="cricd-matchEvent-bowlerToBatsman">{props.bowler.name} to {props.batsmen.striker.name}</span>
                    <span className="cricd-matchEvent-commentary">{describeEvent(props)}</span>
                    <Flex flexColumn>
                        <span className="cricd-matchEvent-innings">{props.ball.innings} innings</span>
                    </Flex>
                </Flex>
            </li>
            <Divider />
        </div>
    );
}

MatchEvent.propTypes = {
    ball: React.PropTypes.object.isRequired,
    eventType: React.PropTypes.string.isRequired,
    bowler: React.PropTypes.object.isRequired, 
    batsmen: React.PropTypes.object.isRequired,
};

MatchEvent.defaultProps = {
    ball: { over: 0, ball: 0, innings: 0 },
    eventType: 'delivery',
    bowler: { name: 'A. Bowler' },
    batsmen: {
        striker: { name: 'A. Striker' },
        nonStriker: { name: 'I Nonstriker' }
    }
};

export default MatchEvent;
