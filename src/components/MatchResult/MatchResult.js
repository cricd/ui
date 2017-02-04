import React from 'react';
import './MatchResult.scss';

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

function MatchResult(props) {
  return (
    <div className="cricd-matchResult">
      <span className="cricd-matchResult-teamName">{props.team.name}</span>
      <span>{props.result}</span>
    </div>
  );
}

MatchResult.propTypes = {
  team: React.PropTypes.object.isRequired,
  result: React.PropTypes.string.isRequired
};

MatchResult.defaultProps = {
  team: { name: 'Team A' },
  result: 'neither won nor lost'
};

export default MatchResult;
