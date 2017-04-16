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
        let selectedMatch = this.props.uiStateStore.selectedMatch;
        if (!selectedMatch) return <Spinner />

        let innings = []; // Innings controls
        selectedMatch.innings.map((inning, index) => {
            return innings.push((<InningsStats sm={12} md={6} {...inning} key={index} innings={index} loading={selectedMatch.loadingScore} />));
        });

        // Suggested bowlers and strikers
        let fieldingPlayers = selectedMatch.fieldingTeam ? selectedMatch.fieldingTeam.players.toJS() : [];
        let suggestedBowler = selectedMatch.nextMatchEvent ? selectedMatch.nextMatchEvent.bowler : null;
        let suggestedStrikers = [];
        if(selectedMatch.batsmen) {
            if(selectedMatch.batsmen.striker) suggestedStrikers.push(selectedMatch.batsmen.striker.batsman);
            if(selectedMatch.batsmen.nonStriker) suggestedStrikers.push(selectedMatch.batsmen.nonStriker.batsman);
        }

        return (
            <div>
                <MatchInfo {...this.props.uiStateStore.selectedMatch} />
                <Divider />
                {this.props.uiStateStore.selectedMatch.result && <MatchResult {...this.props.uiStateStore.selectedMatch.result} />}
                <Flex wrap col={12}>{innings}</Flex>
                <Divider />
                <PlayerPicker
                    label="Bowler"
                    selectedPlayer={suggestedBowler}
                    players={fieldingPlayers}
                    onChange={(player) => { console.log(player) }}
                />
                <PlayerPicker
                    label="Striker"
                    selectedPlayer={selectedMatch.batsmen ? selectedMatch.batsmen.striker.batsman : null}
                    players={suggestedStrikers}
                    onChange={(player) => { console.log(player) }}
                />
                {JSON.stringify()}
            </div>
        )
    }
}

export default ScoreMatch