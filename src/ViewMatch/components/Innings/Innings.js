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
    constructor(){
        super();
        this.state = {};
    }
    
    render() {
        return (
            <div>
                <div>{this.props.battingTeam.name}</div>
                <div>{this.props.innings}</div>
                <p>
                    <span>{this.props.runs}</span>
                    <span>/</span>
                    <span>{this.props.wickets}</span>
                </p>
            </div>
        );
    }
}

export default Innings;
