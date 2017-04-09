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

const MatchResult = observer( ({ text, loading }) => {
  return (
    <div className={classNames("matchResult", {'loading': loading})}>
      <span>{text}</span>
    </div>
  );
});

MatchResult.propTypes = {
  loading: React.PropTypes.bool
};

MatchResult.defaultProps = {
  loading: false
};

export default MatchResult;
