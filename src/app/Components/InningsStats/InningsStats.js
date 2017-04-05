import React from 'react';
import './InningsStats.scss';
import ordinal from 'ordinal-number-suffix';
import Stat from '../Stat/Stat';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import classNames from 'classnames'

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
const InningsStats = observer( ({ innings, battingTeam, runs, wickets, over, ball, loading }) => {
    let inningsOrdinal = ordinal(innings + 1);
    return (

        <div className={classNames("cricd-inningsStats")}>
            <div className={classNames("cricd-inningsStats-teamName", {'loading': loading})}>{battingTeam.name}</div>
            <div className={classNames("cricd-inningsStats-label", {'loading': loading})}>{inningsOrdinal} innings</div>
            <Flex wrap>
                <Stat units="runs" loading={loading}>{runs}</Stat>
                <Stat units="wickets" loading={loading}>{wickets}</Stat>
                <Stat units="overs" loading={loading}>{over + '.' + ball}</Stat>
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
    ball: React.PropTypes.number.isRequired,
    loading: React.PropTypes.bool
};

InningsStats.defaultProps = {
    battingTeam: { name: 'Team A' },
    innings: 1, 
    runs: 0,
    wickets: 0, 
    over: 0, 
    ball: 0,
    loading: false
};

export default InningsStats;
