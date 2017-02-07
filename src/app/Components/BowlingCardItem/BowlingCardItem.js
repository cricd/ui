import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { observer } from 'mobx-react';

/*
{
    "bowler": {
      "id": 12,
      "name": "NL McCullum"
    },
    "runs": 22,
    "legalBallsBowled": 24,
    "widesBowled": 0,
    "runsFromWides": 0,
    "noBallsBowled": 0,
    "runsFromNoBalls": 0,
    "economyRate": 5.5,
    "wickets": [],
    "strikeRate": 22,
    "scoring": {
      "1": 14,
      "2": 2,
      "4": 1
    }
  }
*/

const BowlingCardItem = observer( ({ bowler, legalBallsBowled, runs, wickets, economyRate, scoring, strikeRate }) => {
  const overs = Math.floor(legalBallsBowled / 6) + '.' + legalBallsBowled % 6;

  return (
    <TableRow>
      <TableRowColumn className="cricd-bowlingCard-bowler">{bowler.name}</TableRowColumn>
      <TableRowColumn className="cricd-bowlingCard-metric">{overs}</TableRowColumn>
      <TableRowColumn className="cricd-bowlingCard-metric">{runs}</TableRowColumn>
      <TableRowColumn className="cricd-bowlingCard-metric">{wickets.length}</TableRowColumn>
      <TableRowColumn className="cricd-bowlingCard-collapsible">{economyRate.toPrecision(3)}</TableRowColumn>
      <TableRowColumn className="cricd-bowlingCard-collapsible">{scoring[0]}</TableRowColumn>
      <TableRowColumn className="cricd-bowlingCard-collapsible">{scoring[4]}</TableRowColumn>
      <TableRowColumn className="cricd-bowlingCard-collapsible">{scoring[6]}</TableRowColumn>
      <TableRowColumn className="cricd-bowlingCard-collapsible">{strikeRate.toPrecision(3)}</TableRowColumn>
    </TableRow>
  )
});

BowlingCardItem.propTypes = {
  bowler: React.PropTypes.object.isRequired,
  overs: React.PropTypes.number.isRequired,
  runs: React.PropTypes.number.isRequired,
  wickets: React.PropTypes.any.isRequired,
  economyRate: React.PropTypes.number.isRequired,
  scoring: React.PropTypes.object.isRequired,
  strikeRate: React.PropTypes.number.isRequired,
  legalBallsBowled: React.PropTypes.number.isRequired
};

BowlingCardItem.defaultProps = {
  bowler: { name: 'A Bowler' },
  overs: 0.0,
  runs: 0,
  wickets: [],
  ballsFaced: 0,
  economyRate: 0.0,
  scoring: { 0: 0, 4: 0, 6: 0 },
  strikeRate: 0, 
  legalBallsBowled: 0
};

export default BowlingCardItem;
