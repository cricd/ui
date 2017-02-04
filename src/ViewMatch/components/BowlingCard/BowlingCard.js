import React from 'react';
import './BowlingCard.scss';
import BowlingCardItem from '../BowlingCardItem/BowlingCardItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

function BowlingCard(props) {
    var bowlers = props.bowlers.map((b, key) => {
        return (<BowlingCardItem {...b} key={key} />);
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

BowlingCard.propTypes = {
    bowlers: React.PropTypes.array.isRequired
};

BowlingCard.defaultProps = {
    bowlers: []
};

export default BowlingCard;
