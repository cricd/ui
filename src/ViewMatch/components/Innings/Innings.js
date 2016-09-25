import React, { Component } from 'react';
import './Innings.scss';
import { Stat, Block, Heading } from 'rebass';
import ordinal from 'ordinal-number-suffix';

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
        var innings = ordinal(this.props.innings);

        return (
            <Block borderLeft px={2}>
                <Heading>{this.props.battingTeam.name}</Heading>
                <Heading alt>{innings} innings</Heading>
                <div>
                    <span className="stat"><Stat value={this.props.runs} unit="runs" /></span>
                    <span className="stat"><Stat value={this.props.wickets} unit="wickets" /></span>
                    <span className="stat"><Stat value={this.props.over + '.' + this.props.ball } unit="overs" /></span>
                </div>
            </Block>
        );
    }
}

export default Innings;
