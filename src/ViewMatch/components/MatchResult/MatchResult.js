import React, { Component } from 'react';
import './MatchResult.scss';
import Text from 'rebass';

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
            <strong>
                <span className="teamName">{team}</span>
                <span>{this.props.result}</span>
            </strong>
        );
    }
}

export default MatchResult;
