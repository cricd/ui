import React, { Component } from 'react';
import './Innings.scss';
import ordinal from 'ordinal-number-suffix';
import Stat from '../Stat/Stat';
import { Flex } from 'reflexbox';

class Innings extends Component {
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
            
            <div className="cricd-innings">
                <div className="cricd-innings-teamName">{this.props.battingTeam.name}</div>
                <div className="cricd-innings-label">{innings} innings</div>
                <Flex wrap>
                    <Stat units="runs">{this.props.runs}</Stat>
                    <Stat units="wickets">{this.props.wickets}</Stat>
                    <Stat units="overs">{this.props.over + '.' + this.props.ball}</Stat>
                </Flex>
            </div>
        );
    }
}

export default Innings;
