import React from 'react';
import './MatchResult.scss';
import { observer } from 'mobx-react';
import classNames from 'classnames';

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

const MatchResult = observer( ({ team, result }) => {
  let ld = true

  return (
    <div className={classNames("cricd-matchResult", {'loading': ld})}>
      <span className={classNames("cricd-matchResult-teamName", {'loading': ld})}>{team.name}</span>
      <span>{result}</span>
    </div>
  );
});

MatchResult.propTypes = {
  team: React.PropTypes.object.isRequired,
  result: React.PropTypes.string.isRequired,
  loading: React.PropTypes.bool
};

MatchResult.defaultProps = {
  team: { name: 'Match result' },
  result: 'is being calculated...',
  loading: true
};

export default MatchResult;
