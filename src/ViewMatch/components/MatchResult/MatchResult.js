import React, { Component } from 'react';
import './MatchResult.scss';

class MatchResult extends Component {

    /*
    {
      "innings": {
        "1": {
          "over": 20,
          "ball": 0,
          "battingTeam": {
            "id": 8,
            "name": "Sri Lanka"
          },
          "wickets": 5,
          "runs": 157
        },
        "2": {
          "over": 17,
          "ball": 0,
          "battingTeam": {
            "id": 4,
            "name": "New Zealand"
          },
          "wickets": 10,
          "runs": 110
        }
      },
      "matchEvents": [],
      "result": {
        "team": {
          "id": 8,
          "name": "Sri Lanka"
        },
        "result": "won by 47 runs"
      }
    }
    */
    render() {
        var team = this.props.team ? this.props.team.name : '';
        return (
            <div>
                <span className="teamName">{team}</span>
                <span className="result">{this.props.result}</span>
            </div>
        );
    }
}

export default MatchResult;
