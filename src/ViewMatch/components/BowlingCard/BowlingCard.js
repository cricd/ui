import React, { Component } from 'react';
import './BowlingCard.scss';
import BowlingCardItem from '../BowlingCardItem/BowlingCardItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BowlingCard extends Component {

    render() {
        var bowlers = [];
        if(this.props.bowlers) this.props.bowlers.map((b, key) => {
            return bowlers.push((<BowlingCardItem {...b} key={key} />));
        });

        return (
            <Table className="cricd-bowlingCard-table">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn className="cricd-bowlingCard-bowler">Bowler</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-bowlingCard-overs">Overs</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-bowlingCard-runs">Runs</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-bowlingCard-wickets">Wickets</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-bowlingCard-collapsible">Econ</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-bowlingCard-collapsible">0s</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-bowlingCard-collapsible">4s</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-bowlingCard-collapsible">6s</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-bowlingCard-collapsible">SR</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bowlers}
                </TableBody>
            </Table>
        );
    }
}

export default BowlingCard;
