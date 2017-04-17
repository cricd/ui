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
import './ScoreMatch.scss';
import _ from 'underscore';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import ordinal from 'ordinal-number-suffix';
import Stat from '../Stat/Stat';

@inject('matchStore', 'uiStateStore')
@observer class ScoreMatch extends Component {

    displayRules = { // Determines which UI components to display
        delivery: { runs: true, wickets: false },
        noBall: { runs: true, wickets: true, wicketsFilter: ['runOut', 'obstruction', 'doubleHit', 'handledBall'] },
        wide: { runs: true, wickets: true, wicketsFilter: ['runOut', 'stumped', 'handledBall', 'hitWicket', 'obstruction'] },
        bye: { runs: true, wickets: true, wicketsFilter: ['runOut', 'handledBall', 'obstruction'] },
        legBye: { runs: true, wickets: true, wicketsFilter: ['runOut', 'handledBall', 'obstruction'] },
        bowled: { runs: false, wickets: true },
        timedOut: { runs: false, wickets: true },
        caught: { runs: false, wickets: true, fielder: true },
        handledBall: { runs: true, wickets: true },
        doubleHit: { runs: false, wickets: true },
        hitWicket: { runs: false, wickets: true },
        lbw: { runs: false, wickets: true },
        obstruction: { runs: true, wickets: true },
        runOut: { runs: false, wickets: true, fielder: true, batsman: true },
        stumped: { runs: false, wickets: true, fielder: true }
    };

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
        if (selectedMatch.batsmen) {
            if (selectedMatch.batsmen.striker) suggestedStrikers.push(selectedMatch.batsmen.striker.batsman);
            if (selectedMatch.batsmen.nonStriker) suggestedStrikers.push(selectedMatch.batsmen.nonStriker.batsman);
        }

        return (
            <div>
                <MatchInfo {...this.props.uiStateStore.selectedMatch} />
                <Divider />
                {this.props.uiStateStore.selectedMatch.result && <MatchResult {...this.props.uiStateStore.selectedMatch.result} />}
                <Flex wrap col={12}>{innings}</Flex>
                <Divider />
                <div className="scoreMatch">
                    <div className="cricd-inningsStats-teamName">{selectedMatch.battingTeam ? selectedMatch.battingTeam.name : null}</div>
                    <div className="cricd-inningsStats-label">{selectedMatch.nextMatchEvent ? ordinal(selectedMatch.nextMatchEvent.ball.innings) : null} innings</div>
                    <Flex wrap>
                        <Stat units="innings">{selectedMatch.nextMatchEvent ? ordinal(selectedMatch.nextMatchEvent.ball.innings) : null}</Stat>
                        <Stat units="over">{selectedMatch.nextMatchEvent ? ordinal(selectedMatch.nextMatchEvent.ball.over) : null}</Stat>
                        <Stat units="ball">{selectedMatch.nextMatchEvent ? ordinal(selectedMatch.nextMatchEvent.ball.ball) : null}</Stat>
                    </Flex>
                    <Flex wrap>
                        <PlayerPicker
                            label="Bowler"
                            selectedPlayer={suggestedBowler}
                            players={_(fieldingPlayers).sortBy('name')}
                            onChange={(player) => { console.log(player) }}
                        />
                        <PlayerPicker
                            label="Striker"
                            selectedPlayer={selectedMatch.batsmen ? selectedMatch.batsmen.striker.batsman : null}
                            players={suggestedStrikers}
                            onChange={(player) => { console.log(player) }}
                        />
                    </Flex>
                    <Flex wrap>
                        <SelectField
                            floatingLabelText="Extras"
                            onChange={(delivery) => { console.log(delivery) }}
                        >
                            <MenuItem value="delivery" primaryText="No extras" />
                            <Subheader>Extras</Subheader>
                            <MenuItem value="noBall" primaryText="No ball" />
                            <MenuItem value="wide" primaryText="Wide" />
                            <MenuItem value="bye" primaryText="Bye" />
                            <MenuItem value="legBye" primaryText="Leg Bye" />
                        </SelectField>
                        <SelectField
                            floatingLabelText="Dismissal"
                            onChange={(wicket) => { console.log(wicket) }}
                        >
                            <MenuItem value="delivery" primaryText="No dismissal" />
                            <MenuItem value="bowled" primaryText="Bowled" />
                            <MenuItem value="caught" primaryText="Caught" />
                            <MenuItem value="lbw" primaryText="LBW" />
                            <MenuItem value="runOut" primaryText="Run out" />
                            <MenuItem value="stumped" primaryText="Stumped" />
                            <MenuItem value="hitWicket" primaryText="Hit wicket" />
                            <MenuItem value="obstruction" primaryText="Obstruction" />
                            <MenuItem value="timedOut" primaryText="Timed Out" />
                            <MenuItem value="handledBall" primaryText="Handled ball" />
                            <MenuItem value="doubleHit" primaryText="Double hit" />
                        </SelectField>
                        <SelectField
                            floatingLabelText="Runs"
                            onChange={(runs) => { console.log(runs) }}
                        >
                            <MenuItem value={0} primaryText="Dot ball" />
                            <MenuItem value={1} primaryText="One run" />
                            <MenuItem value={2} primaryText="Two runs" />
                            <MenuItem value={3} primaryText="Three runs" />
                            <MenuItem value={4} primaryText="Four runs" />
                            <MenuItem value={6} primaryText="Six runs" />
                        </SelectField>
                        <PlayerPicker
                            label="Fielder"
                            selectedPlayer={null}
                            players={_(fieldingPlayers).sortBy('name')}
                            onChange={(player) => { console.log(player) }}
                        />
                        <PlayerPicker
                            label="Batsman"
                            selectedPlayer={selectedMatch.nextMatchEvent ? selectedMatch.nextMatchEvent.batsman : null}
                            players={suggestedStrikers}
                            onChange={(player) => { console.log(player) }}
                        />
                    </Flex>
                </div>
                {JSON.stringify(selectedMatch.nextMatchEvent)}
            </div>
        )
    }
}

export default ScoreMatch