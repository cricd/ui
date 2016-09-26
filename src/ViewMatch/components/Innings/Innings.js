import React, { Component } from 'react';
import './Innings.scss';
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
            <div>
                <div>{this.props.battingTeam.name}</div>
                <div>{innings} innings</div>
                <div>
                    <span className="stat">
                        <span>{this.props.runs} unit="runs"></span>
                        <span>runs</span>
                    </span>
                    <span className="stat">
                        <span>{this.props.wickets}</span>
                        <span>wickets</span>
                    </span>
                    <span className="stat">
                        <span>{this.props.over + '.' + this.props.ball}</span>
                        <span>overs</span>
                    </span>
                </div>
            </div>
        );
    }
}

export default Innings;
