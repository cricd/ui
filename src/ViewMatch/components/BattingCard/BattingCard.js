import React, { Component } from 'react';
import './BattingCard.scss';
import BatsmansInnings from '../BatsmansInnings/BatsmansInnings';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BattingCard extends Component {

    render() {
        var batsmen = [];
        if(this.props.batsmen) this.props.batsmen.map((b, key) => {
            return batsmen.push((<BatsmansInnings {...b} key={key} />));
        });

        return (
            <Table className="cricd-battingCard-table">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn className="cricd-battingCard-batsman">Batsman</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-battingCard-dismissal">Dismissal</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-battingCard-runs">Runs</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-battingCard-collapsible">Balls</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-battingCard-collapsible">4s</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-battingCard-collapsible">6s</TableHeaderColumn>
                        <TableHeaderColumn className="cricd-battingCard-collapsible">SR</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {batsmen}
                </TableBody>
            </Table>
        );
    }
}

export default BattingCard;
