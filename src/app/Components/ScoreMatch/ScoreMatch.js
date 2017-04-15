import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Flex } from 'reflexbox';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import MatchResult from '../MatchResult/MatchResult';
import MatchInfo from '../MatchInfo/MatchInfo';
import InningsStats from '../InningsStats/InningsStats';
import BowlingCard from '../BowlingCard/BowlingCard';
import BattingCard from '../BattingCard/BattingCard';
import PlayerPicker from '../PlayerPicker/PlayerPicker';
import Spinner from '../Spinner/Spinner';

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
        if (!this.props.uiStateStore.selectedMatch) return <Spinner />

        let innings = []; // Innings controls
        this.props.uiStateStore.selectedMatch.innings.map((inning, index) => {
            return innings.push((<InningsStats sm={12} md={6} {...inning} key={index} innings={index} loading={this.props.uiStateStore.selectedMatch.loadingScore} />));
        });

        let batting = this.props.uiStateStore.selectedMatch.batsmen;
        let striker; 
        let battingList = [];
        if (batting && batting.striker) battingList.push(batting.striker.batsman);
        if (batting && batting.nonStriker) battingList.push(batting.nonStriker.batsman);
        if(batting) striker = batting.striker;

        return (
            <div>
                <MatchInfo {...this.props.uiStateStore.selectedMatch} />
                <Divider />
                {this.props.uiStateStore.selectedMatch.result && <MatchResult {...this.props.uiStateStore.selectedMatch.result} />}
                <Flex wrap col={12}>{innings}</Flex>
                <Divider />
                <PlayerPicker 
                    label="Striker"
                    value={striker}
                    suggestedPlayers={battingList}
                    players={this.props.uiStateStore.selectedMatch.homeTeam.players}
                    isRequired={()=> {console.log('Player select')}}
                />
                {JSON.stringify(battingList)}
                <Paper zDepth={1}>
                    <BattingCard batsmen={battingList} />
                </Paper>
                <Paper zDepth={1}>
                    <BowlingCard bowlers={[this.props.uiStateStore.selectedMatch.bowler]} />
                </Paper>
            </div>
        )
    }
}

export default ScoreMatch