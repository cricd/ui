import React, { Component } from 'react';
import './InningsStats.scss';
import ordinal from 'ordinal-number-suffix';
import Stat from '../Stat/Stat';
import { Flex } from 'reflexbox';

class InningsStats extends Component {
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
    render() {
        var innings = ordinal(this.props.innings + 1);

        return (
            
            <div className="cricd-inningsStats">
                <div className="cricd-inningsStats-teamName">{this.props.battingTeam.name}</div>
                <div className="cricd-inningsStats-label">{innings} innings</div>
                <Flex wrap>
                    <Stat units="runs">{this.props.runs}</Stat>
                    <Stat units="wickets">{this.props.wickets}</Stat>
                    <Stat units="overs">{this.props.over + '.' + this.props.ball}</Stat>
                </Flex>
            </div>
        );
    }
}

export default InningsStats;
