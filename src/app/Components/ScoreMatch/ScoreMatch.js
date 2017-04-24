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
import RunsPicker from '../RunsPicker/RunsPicker';
import Spinner from '../Spinner/Spinner';
import './ScoreMatch.scss';
import _ from 'underscore';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import ordinal from 'ordinal-number-suffix';
import Stat from '../Stat/Stat';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

@inject('matchStore', 'uiStateStore')
@observer class ScoreMatch extends Component {
    constructor(props) {
        super(props);
        this.changeBowler = this.changeBowler.bind(this);
        this.changeStriker = this.changeStriker.bind(this);
        this.changeEventType = this.changeEventType.bind(this);
        this.changeFielder = this.changeFielder.bind(this);
        this.changeBatsman = this.changeBatsman.bind(this);
        this.changeRuns = this.changeRuns.bind(this);
    }

    @observable displayFilter = { runs: true };
    displayRules = { // Determines which UI components to display
        delivery: { runs: true },
        noBall: { runs: true, wicketsFilter: ['runOut', 'obstruction', 'doubleHit', 'handledBall'] },
        wide: { runs: true, wicketsFilter: ['runOut', 'stumped', 'handledBall', 'hitWicket', 'obstruction'] },
        bye: { runs: true, wicketsFilter: ['runOut', 'handledBall', 'obstruction'] },
        legBye: { runs: true, wicketsFilter: ['runOut', 'handledBall', 'obstruction'] },
        bowled: { runs: false },
        timedOut: { runs: false },
        caught: { runs: false, fielder: true },
        handledBall: { runs: true },
        doubleHit: { runs: false },
        hitWicket: { runs: false },
        lbw: { runs: false },
        obstruction: { runs: true, batsman: true },
        runOut: { runs: true, fielder: true, batsman: true },
        stumped: { runs: false, fielder: true }
    };

    componentDidMount() { // Retrieve match info on load
        this.props.matchStore.getMatch(
            this.props.params.matchId,
            (err, match) => {
                if(err) return this.props.uiStateStore.displayError(err);
                this.props.uiStateStore.changeSelectedMatch(match);
            });
    }

    @action changeEventType(event, key, eventType) {
        this.displayFilter = this.displayRules[eventType];
        this.props.uiStateStore.selectedMatch.changeNextBallEvent('eventType', eventType);
        this.props.uiStateStore.selectedMatch.changeNextBallEvent('fielder', null);
        this.props.uiStateStore.selectedMatch.changeNextBallEvent('batsman', null);
        this.props.uiStateStore.selectedMatch.changeNextBallEvent('runs', null);
    }
    changeBowler(player) { this.props.uiStateStore.selectedMatch.changeNextBallEvent('bowler', player); }
    changeStriker(player) {
        let oldStriker = { ...this.props.uiStateStore.selectedMatch.batsmen.striker.batsman };
        if(oldStriker.id === player.id) return; // No change

        // This is currently only a swap
        let oldNonStriker = { ...this.props.uiStateStore.selectedMatch.batsmen.nonStriker.batsman };
        let batsmen = {
            striker: player,
            nonStriker: oldStriker
        }
        this.props.uiStateStore.selectedMatch.changeNextBallEvent('batsmen', batsmen);
    }
    changeFielder(player) { this.props.uiStateStore.selectedMatch.changeNextBallEvent('fielder', player); }
    changeBatsman(player) { this.props.uiStateStore.selectedMatch.changeNextBallEvent('batsman', player); }
    changeRuns(event, key, runs) { this.props.uiStateStore.selectedMatch.changeNextBallEvent('runs', runs); }

    render() {
        let selectedMatch = this.props.uiStateStore.selectedMatch;
        if(!selectedMatch) return <Spinner />

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

        // Whether or not to enable the Score button
        let isValidScore = selectedMatch && selectedMatch.batsmen && selectedMatch.batsmen.striker; // Must be a striker
        isValidScore = isValidScore && selectedMatch.batsmen.nonStriker; // And a non-striker
        isValidScore = isValidScore && selectedMatch.bowler; // And a bowler
        isValidScore = isValidScore && (this.displayFilter.runs ? selectedMatch.nextMatchEvent.runs != null : true); // Runs are specified when needed
        isValidScore = isValidScore && (this.displayFilter.batsman ? !selectedMatch.nextMatchEvent.batsman != null : true); // Batsman is specified if required

        return (
            <div>
                <MatchInfo {...this.props.uiStateStore.selectedMatch} />
                <Divider />
                {this.props.uiStateStore.selectedMatch.result && <MatchResult {...this.props.uiStateStore.selectedMatch.result} />}
                <div className="scoreMatch-inningsStats">
                    <Flex wrap col={12}>{innings}</Flex>
                </div>
                <div className="scoreMatch">
                    <Flex wrap>
                        <div className="scoreMatch-ball">
                            <div className="cricd-inningsStats-teamName">{selectedMatch.battingTeam ? selectedMatch.battingTeam.name : null}</div>
                            <div className="cricd-inningsStats-label">{selectedMatch.nextMatchEvent ? ordinal(selectedMatch.nextMatchEvent.ball.innings) : null} innings</div>
                        </div>
                        <div>
                            <Stat units="over">{selectedMatch.nextMatchEvent ? ordinal(selectedMatch.nextMatchEvent.ball.over) : null}</Stat>
                            <Stat units="ball">{selectedMatch.nextMatchEvent ? ordinal(selectedMatch.nextMatchEvent.ball.ball) : null}</Stat>
                        </div>
                    </Flex>
                    <Divider />
                    <Flex wrap>
                        <PlayerPicker
                            label="Bowler"
                            selectedPlayer={suggestedBowler}
                            players={_(fieldingPlayers).sortBy('name')}
                            onChange={this.changeBowler}
                            isRequiredError="Who is bowling?"
                        />
                        <PlayerPicker
                            label="Striker"
                            selectedPlayer={selectedMatch.batsmen ? selectedMatch.batsmen.striker.batsman : null}
                            players={suggestedStrikers}
                            onChange={this.changeStriker}
                            isRequiredError="Who is the batsman on strike?"
                        />
                    </Flex>
                    <Flex wrap>
                        <SelectField
                            floatingLabelText="What happened?"
                            floatingLabelFixed={true}
                            onChange={this.changeEventType}
                            value={selectedMatch.nextMatchEvent ? selectedMatch.nextMatchEvent.eventType : null}
                        >
                            <MenuItem value="delivery" primaryText="Legal delivery" />
                            <Subheader>Extras</Subheader>
                            <MenuItem value="noBall" primaryText="No ball" />
                            <MenuItem value="wide" primaryText="Wide" />
                            <MenuItem value="bye" primaryText="Bye" />
                            <MenuItem value="legBye" primaryText="Leg Bye" />
                            <Subheader>Dismissal</Subheader>
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
                        {this.displayFilter.runs && <RunsPicker
                            onChange={this.changeRuns}
                            runs={selectedMatch.nextMatchEvent ? selectedMatch.nextMatchEvent.runs : null}
                        />}
                        {this.displayFilter.batsman && <PlayerPicker
                            label="Batsman"
                            selectedPlayer={selectedMatch.nextMatchEvent ? selectedMatch.nextMatchEvent.batsman : null}
                            players={suggestedStrikers}
                            onChange={this.changeBatsman}
                            isRequiredError="Which batsman?"
                        />}
                        {this.displayFilter.fielder && <PlayerPicker
                            label="Fielder"
                            selectedPlayer={selectedMatch.nextMatchEvent ? selectedMatch.nextMatchEvent.fielder : null}
                            players={_(fieldingPlayers).sortBy('name')}
                            onChange={this.changeFielder}
                        />}
                    </Flex>
                    <div style={{ padding: 10 }}>
                        <FlatButton
                            label="Reset"
                            style={{ marginRight: 12 }}
                            onTouchTap={() => { 
                                this.changeEventType(null, null, 'delivery');
                                this.changeRuns(null, null, 0);
                            }} />
                        <RaisedButton
                            label="Save score"
                            primary={true}
                            disabled={!isValidScore}
                            onTouchTap={() => {
                                selectedMatch.scoreNextMatchEvent((err) => console.log(err))
                            }} />
                    </div>
                </div>
                <div>
                    <h3>Debug data</h3>
                    {JSON.stringify(selectedMatch.nextMatchEvent)}
                </div>
            </div>
        )
    }
}

export default ScoreMatch