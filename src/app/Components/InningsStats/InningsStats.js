import React from 'react';
import './InningsStats.scss';
import ordinal from 'ordinal-number-suffix';
import Stat from '../Stat/Stat';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';

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
const InningsStats = observer( ({ innings, battingTeam, runs, wickets, over, ball }) => {
    let inningsOrdinal = ordinal(innings + 1);

    return (

        <div className="cricd-inningsStats">
            <div className="cricd-inningsStats-teamName">{battingTeam.name}</div>
            <div className="cricd-inningsStats-label">{inningsOrdinal} innings</div>
            <Flex wrap>
                <Stat units="runs">{runs}</Stat>
                <Stat units="wickets">{wickets}</Stat>
                <Stat units="overs">{over + '.' + ball}</Stat>
            </Flex>
        </div>
    );
});

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
