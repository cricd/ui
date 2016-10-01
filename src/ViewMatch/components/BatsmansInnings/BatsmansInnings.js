import React, { Component } from 'react';
import './BatsmansInnings.scss';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BatsmansInnings extends Component {

/*
{
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

describeDismissal(e) {
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

  getBatsmanName(e) {
    let name = 'John Smith'; 
    if(e.dismissal) {
      name = e.batsman ? e.batsman.name : e.batsmen.striker.name;
    }
    else if(e.events && e.events.length > 0) {
      const firstEvent = e.events[0];
      name = firstEvent.batsman ? firstEvent.batsman.name : firstEvent.batsmen.striker.name;
    }
    return name;
  }

  render() {
    const dismissal = this.describeDismissal(this.props.dismissal);
    const name = this.getBatsmanName(this.props);
    const notOut = this.props.dismissal ? '' : '*';

    return (
        <TableRow>
          <TableRowColumn className="cricd-battingCard-batsman">{name}</TableRowColumn>
          <TableRowColumn className="cricd-battingCard-dismissal">{dismissal}</TableRowColumn>
          <TableRowColumn className="cricd-battingCard-runs">{this.props.runs}{notOut}</TableRowColumn>
          <TableRowColumn className="cricd-battingCard-collapsible">{this.props.ballsFaced}</TableRowColumn>
          <TableRowColumn className="cricd-battingCard-collapsible">{this.props.scoring[4]}</TableRowColumn>
          <TableRowColumn className="cricd-battingCard-collapsible">{this.props.scoring[6]}</TableRowColumn>
          <TableRowColumn className="cricd-battingCard-collapsible">{this.props.strikeRate.toPrecision(3)}</TableRowColumn>
        </TableRow>
    )
  }
}

export default BatsmansInnings;
