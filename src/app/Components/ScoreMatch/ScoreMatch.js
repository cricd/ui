import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react';
import { action, autorun } from 'mobx';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import MatchResult from '../MatchResult/MatchResult';
import MatchInfo from '../MatchInfo/MatchInfo';
import InningsStats from '../InningsStats/InningsStats';
import { Flex } from 'reflexbox';
import BowlingCard from '../BowlingCard/BowlingCard';
import BattingCard from '../BattingCard/BattingCard';

@inject('matchStore', 'uiStateStore')
@observer class ScoreMatch extends Component {

    componentDidMount() {
        this.props.matchStore.getMatch(
            this.props.params.matchId,
            (err, match) => {
                if (err) return this.props.uiStateStore.displayError(err);
                this.props.uiStateStore.changeSelectedMatch(match);
            });
    }

    render() {
        if (!this.props.uiStateStore.selectedMatch) { // If loading, show spinner
            return <div><CircularProgress size={100} thickness={10} className="cricd-viewMatch-spinner" /></div>
        }

        let innings = []; // Innings controls
        if (this.props.uiStateStore.selectedMatch.innings.length > 0) {
            // Create innings controls
            this.props.uiStateStore.selectedMatch.innings.map((inning, index) => {
                return innings.push((<InningsStats sm={12} md={6} {...inning} key={index} innings={index} />));
            });
        }

        let batting = this.props.uiStateStore.selectedMatch.batsmen;
        let battingList = [];
        if(batting && batting.striker) battingList.push(batting.striker);
        if(batting && batting.nonStriker) battingList.push(batting.nonStriker);

        return (
            <div>
                <MatchInfo {...this.props.uiStateStore.selectedMatch} />
                <Divider />
                <Flex wrap col={12}>{innings}</Flex>
                <BattingCard batsmen={battingList} />
                <BowlingCard bowlers={[this.props.uiStateStore.selectedMatch.bowler]} />
            </div>
        )
    }
}

export default ScoreMatch