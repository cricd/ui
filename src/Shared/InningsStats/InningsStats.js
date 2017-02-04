import React from 'react';
import './InningsStats.scss';
import ordinal from 'ordinal-number-suffix';
import Stat from '../Stat/Stat';
import { Flex } from 'reflexbox';

/*
{
  "over": 20,
  "ball": 0,
  "battingTeam": {
    "id": 4,
    "name": "New Zealand"
  },
  "wickets": 9,
  "runs": 191
}
*/
function InningsStats(props) {
    var innings = ordinal(props.innings + 1);

    return (

        <div className="cricd-inningsStats">
            <div className="cricd-inningsStats-teamName">{props.battingTeam.name}</div>
            <div className="cricd-inningsStats-label">{innings} innings</div>
            <Flex wrap>
                <Stat units="runs">{props.runs}</Stat>
                <Stat units="wickets">{props.wickets}</Stat>
                <Stat units="overs">{props.over + '.' + props.ball}</Stat>
            </Flex>
        </div>
    );
}

InningsStats.propTypes = {
    battingTeam: React.PropTypes.object.isRequired,
    innings: React.PropTypes.number.isRequired,
    runs: React.PropTypes.number.isRequired,
    wickets: React.PropTypes.number.isRequired,
    over: React.PropTypes.number.isRequired,
    ball: React.PropTypes.number.isRequired
};

InningsStats.defaultProps = {
    battingTeam: { name: 'Team A' },
    innings: 1, 
    runs: 0,
    wickets: 0, 
    over: 0, 
    ball: 0
};

export default InningsStats;
