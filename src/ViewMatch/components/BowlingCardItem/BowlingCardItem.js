import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BowlingCardItem extends Component {

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

  render() {
    const overs = Math.floor(this.props.legalBallsBowled / 6) + '.' + this.props.legalBallsBowled % 6;

    return (
        <TableRow>
          <TableRowColumn className="cricd-bowlingCard-bowler">{this.props.bowler.name}</TableRowColumn>
          <TableRowColumn className="cricd-bowlingCard-metric">{overs}</TableRowColumn>
          <TableRowColumn className="cricd-bowlingCard-metric">{this.props.runs}</TableRowColumn>
          <TableRowColumn className="cricd-bowlingCard-metric">{this.props.wickets.length}</TableRowColumn>
          <TableRowColumn className="cricd-bowlingCard-collapsible">{this.props.economyRate.toPrecision(3)}</TableRowColumn>
          <TableRowColumn className="cricd-bowlingCard-collapsible">{this.props.scoring[1]}</TableRowColumn>
          <TableRowColumn className="cricd-bowlingCard-collapsible">{this.props.scoring[4]}</TableRowColumn>
          <TableRowColumn className="cricd-bowlingCard-collapsible">{this.props.scoring[6]}</TableRowColumn>
          <TableRowColumn className="cricd-bowlingCard-collapsible">{this.props.strikeRate.toPrecision(3)}</TableRowColumn>
        </TableRow>                        
    )
  }
}

export default BowlingCardItem;
