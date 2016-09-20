import React, { Component } from 'react';
import './Innings.scss';

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
        return (
            <div>
                <h1>{this.props.score.battingTeam.name}</h1>
                <h2>{this.props.innings} </h2>
                <p>
                    <span>{this.props.score.runs}</span>
                    <span>/</span>
                    <span>{this.props.score.wickets}</span>
                </p>
            </div>
        );
    }
}

export default Innings;
