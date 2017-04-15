import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { observer } from 'mobx-react';

/*{
      "runs": 0,
      "scoring": {},
      "ballsFaced": 5,
      "events": []],
      "strikeRate": 0,
      "dismissal": {
        "match": 1,
        "eventType": "caught",
        "timestamp": "2009-06-21",
        "ball": {
          "battingTeam": {
            "id": 5,
            "name": "Sri Lanka"
          },
          "fieldingTeam": {
            "id": 1,
            "name": "Pakistan"
          },
          "innings": 1,
          "over": 0,
          "ball": 5
        },
        "runs": 0,
        "batsmen": {
          "striker": {
            "id": 1,
            "name": "TM Dilshan"
          },
          "nonStriker": {
            "id": 5,
            "name": "ST Jayasuriya"
          }
        },
        "bowler": {
          "id": 11,
          "name": "Mohammad Amir"
        },
        "fielder": {
          "id": 16,
          "name": "Shahzaib Hasan"
        }
      }
    }
*/

const BattingCardItem = observer( ({ batsman, dismissal, runs, ballsFaced, scoring, strikeRate }) => {
  const dismissalDescription = describeDismissal(dismissal);
  const notOut = dismissal ? '' : '*';

  return (
    <TableRow>
      <TableRowColumn className="cricd-battingCard-batsman">{batsman.name}</TableRowColumn>
      <TableRowColumn className="cricd-battingCard-dismissal">{dismissalDescription}</TableRowColumn>
      <TableRowColumn className="cricd-battingCard-runs">{runs}{notOut}</TableRowColumn>
      <TableRowColumn className="cricd-battingCard-collapsible">{ballsFaced}</TableRowColumn>
      <TableRowColumn className="cricd-battingCard-collapsible">{scoring[4]}</TableRowColumn>
      <TableRowColumn className="cricd-battingCard-collapsible">{scoring[6]}</TableRowColumn>
      <TableRowColumn className="cricd-battingCard-collapsible">{strikeRate ? strikeRate.toPrecision(3) : 0.0}</TableRowColumn>
    </TableRow>
  )
});

BattingCardItem.propTypes = {
  batsman: React.PropTypes.object.isRequired,
  dismissal: React.PropTypes.object,
  runs: React.PropTypes.number.isRequired,
  ballsFaced: React.PropTypes.number.isRequired,
  scoring: React.PropTypes.object.isRequired,
  strikeRate: React.PropTypes.number
};

BattingCardItem.defaultProps = {
  batsman: { name: 'A Batsman' },
  runs: 0,
  ballsFaced: 0,
  scoring: { 4: 0, 6: 0 },
  strikeRate: 0
};

export default BattingCardItem;

function describeDismissal(e) {
  if(!e) return 'Not out';
  switch(e.eventType) {
    case "bowled":
      return 'b ' + e.bowler.name;
    case "timedOut":
      return 'Timed out';
    case "handledBall":
      return 'Handled ball';
    case "doubleHit":
      return 'Double hit';
    case "hitWicket":
      return 'Hit wicket b ' + e.bowler.name;
    case "lbw":
      return 'Lbw b ' + e.bowler.name;
    case "obstruction":
      return 'Obstruction';
    case "caught":
      if(e.fielder) return 'c ' + e.fielder.name + ' b ' + e.bowler.name;
      else return 'Caught b' + e.bowler.name;
    case "runOut":
      if(e.fielder) return 'Run out (' + e.fielder.name + ')';
      else return 'Run out';
    case "stumped":
      if(e.fielder) return 'Stumped ' + e.fielder.name + ' b ' + e.bowler.name;
      else return 'Stumped b ' + e.bowler.name;
    default: return '';
  }
}

