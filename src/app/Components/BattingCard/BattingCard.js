import React from 'react';
import './BattingCard.scss';
import BattingCardItem from '../BattingCardItem/BattingCardItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { observer } from 'mobx-react';

 const BattingCard = observer( ({ batsmen }) => {
    let cards = batsmen.map((b, key) => {
        return (<BattingCardItem {...b} key={key} />);
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
                {cards}
            </TableBody>
        </Table>
    );
});

BattingCard.propTypes = {
    batsmen: React.PropTypes.any.isRequired
};

BattingCard.defaultProps = {
    batsmen: []
};

export default BattingCard;
